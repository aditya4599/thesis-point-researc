"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SubscribeForm } from "@/components/SubscribeForm";
import type { ContentType, ResearchItem } from "@/lib/types";

interface ResearchHubClientProps {
  items: ResearchItem[];
}

const TYPES: { v: ContentType; label: string; cta: string }[] = [
  { v: "stock-report", label: "Stock reports", cta: "Read report" },
  { v: "article", label: "Articles", cta: "Read article" },
  { v: "pitch", label: "Pitch decks", cta: "View deck" },
  { v: "sector-note", label: "Sector notes", cta: "Read note" },
];

const MAX_SCALE = 80;

function money(value: number) {
  return "$" + Math.round(value).toLocaleString("en-US");
}
function pct(n: number) {
  return (n > 0 ? "+" : "") + n.toFixed(1) + "%";
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}
function upsideOf(r: ResearchItem) {
  const cur = r.metadata?.current_price;
  const target = r.metadata?.target_price;
  if (cur && target && cur > 0) return ((target - cur) / cur) * 100;
  return null;
}
function isReco(r: ResearchItem) {
  return r.type === "stock-report";
}
function typeOf(v: ContentType) {
  return TYPES.find((t) => t.v === v) ?? { v, label: v, cta: "Read" };
}

type FilterKey = "type" | "sector" | "rating";

export function ResearchHubClient({ items }: ResearchHubClientProps) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [sector, setSector] = useState<string>("all");
  const [rating, setRating] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "upside">("newest");
  const [selected, setSelected] = useState<string | null>(null);

  function matches(r: ResearchItem, skip?: FilterKey) {
    const text = [r.title, r.metadata?.company_name, r.ticker, r.sector, r.summary]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const query = q.trim().toLowerCase();
    return (
      (skip === "type" || type === "all" || r.type === type) &&
      (skip === "sector" || sector === "all" || r.sector === sector) &&
      (skip === "rating" || rating === "all" || (isReco(r) && r.rating === rating)) &&
      (!query || text.includes(query))
    );
  }

  const filtered = useMemo(() => items.filter((r) => matches(r)), [items, q, type, sector, rating]);

  const filterGroups = useMemo(() => {
    function counted(key: FilterKey, options: { v: string; label: string }[]) {
      return options
        .map((o) => ({
          ...o,
          n: items.filter((r) => matches(r, key) && optionMatch(r, key, o.v)).length,
        }))
        .filter((o) => o.n > 0);
    }
    function optionMatch(r: ResearchItem, key: FilterKey, v: string) {
      if (key === "type") return r.type === v;
      if (key === "sector") return r.sector === v;
      if (key === "rating") return isReco(r) && r.rating === v;
      return false;
    }
    const sectors = Array.from(new Set(items.map((r) => r.sector))).map((s) => ({ v: s, label: s }));
    const ratings = Array.from(new Set(items.filter(isReco).map((r) => r.rating).filter(Boolean))) as string[];

    return [
      { key: "type" as FilterKey, label: "Type", value: type, set: setType, options: counted("type", TYPES.map((t) => ({ v: t.v, label: t.label }))) },
      { key: "sector" as FilterKey, label: "Sector", value: sector, set: setSector, options: counted("sector", sectors) },
      { key: "rating" as FilterKey, label: "Rating", value: rating, set: setRating, options: counted("rating", ratings.map((r) => ({ v: r, label: r }))) },
    ].filter((g) => g.options.length >= 2);
  }, [items, q, type, sector, rating]);

  const recos = useMemo(() => {
    return filtered
      .filter(isReco)
      .map((r) => ({ r, upside: upsideOf(r) ?? 0 }))
      .sort((a, b) => b.upside - a.upside);
  }, [filtered]);

  const activeSlug = recos.some((x) => x.r.slug === selected) ? selected : recos[0]?.slug ?? null;
  const activePreview = recos.find((x) => x.r.slug === activeSlug)?.r ?? null;
  const activeUpside = activePreview ? upsideOf(activePreview) ?? 0 : 0;

  const archive = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "upside") {
        const ua = upsideOf(a);
        const ub = upsideOf(b);
        return (ub ?? -Infinity) - (ua ?? -Infinity);
      }
      return a.date === b.date ? 0 : a.date < b.date ? 1 : -1;
    });
  }, [filtered, sort]);

  function clearFilters() {
    setQ("");
    setType("all");
    setSector("all");
    setRating("all");
  }

  return (
    <>
      <section className="wrap lib-head flex flex-col flex-wrap items-start justify-between gap-10 pt-10 pb-10 sm:pt-16 lg:flex-row lg:items-end lg:gap-20">
        <div className="flex max-w-[760px] flex-col gap-6">
          <h1 className="h-display">Research library</h1>
          <p className="lede">
            Initiations, rated Recos and longer reads on US markets. Search a
            ticker, or narrow by sector and rating.
          </p>
        </div>
        <div className="search flex w-full flex-col gap-2.5 font-sans sm:w-[min(440px,100%)]">
          <label htmlFor="search" className="text-[16px] font-medium">
            Search by company, ticker or topic
          </label>
          <input
            id="search"
            type="search"
            placeholder="Try RKLB, Adobe or nuclear"
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="min-h-[60px] rounded-full border-[1.5px] border-navy bg-paper px-6 text-[19px] text-navy"
          />
        </div>
      </section>

      <div className="wrap">
        <section aria-label="Filters" className="filters flex flex-wrap items-start justify-between gap-6 border-y border-rule py-6 font-sans" style={{ borderTopWidth: 2, borderTopColor: "var(--navy, #082045)" }}>
          <div className="flex flex-wrap gap-5 gap-x-12">
            {filterGroups.map((g) => (
              <div key={g.key} className="flex flex-wrap items-center gap-2">
                <span className="mr-1.5 text-[15px] text-ink-3">{g.label}</span>
                <button type="button" className="pill" aria-pressed={g.value === "all"} onClick={() => g.set("all")}>
                  All
                </button>
                {g.options.map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    className="pill"
                    aria-pressed={g.value === o.v}
                    onClick={() => g.set(o.v)}
                  >
                    <span>{o.label}</span>
                    <span className="font-normal">{o.n}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end gap-2.5">
            <div className="flex gap-2">
              <button type="button" className="pill" aria-pressed={sort === "newest"} onClick={() => setSort("newest")}>
                Newest
              </button>
              <button type="button" className="pill" aria-pressed={sort === "upside"} onClick={() => setSort("upside")}>
                Highest upside
              </button>
            </div>
            <p className="text-[15px] text-ink-3">
              Showing {filtered.length} of {items.length}
            </p>
          </div>
        </section>
      </div>

      <section className="wrap board-wrap flex flex-col gap-8 py-16 sm:py-24">
        <div className="section-head">
          <h2 className="h-sub">The upside board</h2>
          <p className="max-w-[520px] text-[18px] leading-[1.55] text-ink-2">
            Every Reco, ranked by upside to our target on the day we published. Select one to preview it.
          </p>
        </div>
        <div className="board-row flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="board flex min-w-0 flex-grow flex-col gap-1.5 font-sans">
            {recos.length === 0 ? (
              <p className="m-0 rounded-2xl border-[1.5px] border-dashed border-rule-2 p-10 font-serif text-[18px] text-ink-2">
                No Recos match these filters. Clear a filter to see the board.
              </p>
            ) : (
              recos.map(({ r, upside }) => {
                const met = r.metadata?.current_price != null && r.metadata?.target_price != null && r.metadata.current_price >= r.metadata.target_price;
                const w = Math.min(100, (upside / MAX_SCALE) * 100);
                return (
                  <button
                    key={r.slug}
                    type="button"
                    aria-pressed={r.slug === activeSlug}
                    onClick={() => setSelected(r.slug)}
                    className="grid w-full grid-cols-[84px_minmax(0,1fr)_72px] items-center gap-3 rounded-2xl border-[1.5px] border-transparent px-3 py-3.5 text-left text-navy hover:bg-paper aria-pressed:border-navy aria-pressed:bg-paper sm:grid-cols-[150px_minmax(0,1fr)_100px] sm:gap-6 sm:px-5"
                  >
                    <span className="flex flex-col gap-0.5">
                      <strong className="text-[22px]">{r.ticker}</strong>
                      <small className="text-[14px] text-ink-3">
                        {r.rating}, {fmtDate(r.date)}
                      </small>
                    </span>
                    <span className="relative block h-7">
                      <span className="absolute left-0 right-0 top-[13px] h-0.5 bg-rule" />
                      <span
                        className={`absolute top-2 h-3 transition-all duration-500 ${met ? "bg-green-bar" : "bg-blue"}`}
                        style={{ left: 0, width: `${w}%` }}
                      />
                      <span className="absolute left-[-10px] top-1 h-5 w-5 rounded-full bg-navy" />
                      <span
                        className={`absolute top-px h-[26px] w-[26px] -ml-[13px] rounded-full border-4 bg-sage ${met ? "border-green-bar" : "border-blue"}`}
                        style={{ left: `${w}%` }}
                      />
                    </span>
                    <span className="num text-right text-[19px] font-semibold sm:text-[24px]">{pct(upside)}</span>
                  </button>
                );
              })
            )}
          </div>

          <aside className="preview flex min-h-[520px] w-full flex-shrink-0 flex-col gap-7 rounded-[24px] bg-navy p-7 text-sage sm:p-10 lg:w-[460px]">
            {!activePreview ? (
              <p className="text-[20px] leading-[1.55] text-[#dce3ef]">
                Pick a Reco on the board to see its rating, target and thesis here.
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between font-sans">
                  <span className="text-[16px] text-dark-soft">{activePreview.ticker}</span>
                  <span className="rounded-full bg-blue px-3.5 py-1.5 font-sans text-[15px] font-bold text-white">
                    {activePreview.rating}
                  </span>
                </div>
                <h3 className="font-sans text-[36px] font-semibold leading-none tracking-[-0.03em] sm:text-[48px]">
                  {activePreview.metadata?.company_name ?? activePreview.title}
                </h3>
                <dl className="m-0 grid grid-cols-3 gap-4 border-y border-dark-rule py-5 font-sans">
                  <div>
                    <dt className="text-[14px] text-dark-soft">Price then</dt>
                    <dd className="num mt-1 text-[21px] font-semibold sm:text-[26px]">
                      {activePreview.metadata?.current_price ? money(activePreview.metadata.current_price) : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[14px] text-dark-soft">Target</dt>
                    <dd className="num mt-1 text-[21px] font-semibold sm:text-[26px]">
                      {activePreview.metadata?.target_price ? money(activePreview.metadata.target_price) : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[14px] text-dark-soft">Upside</dt>
                    <dd className="num mt-1 text-[21px] font-semibold sm:text-[26px]">{pct(activeUpside)}</dd>
                  </div>
                </dl>
                <p className="text-[20px] leading-[1.55] text-[#dce3ef]">{activePreview.summary}</p>
                <p className="font-sans text-[15px] text-dark-soft">
                  {activePreview.sector}. Published {fmtDate(activePreview.date)} by {activePreview.author}.
                </p>
                <Link href={`/research/stock-reports/${activePreview.slug}`} className="btn btn-primary self-start">
                  Read the full report
                </Link>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="wrap archive flex flex-col pb-24">
        <div className="section-head border-t-2 border-navy py-7">
          <h2 className="h-sub">Everything we&rsquo;ve published</h2>
        </div>
        {archive.length === 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-rule py-10 text-[20px] text-ink-2">
            <p className="m-0">Nothing matches that search and those filters.</p>
            <button type="button" className="btn" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          archive.map((r) => {
            const t = typeOf(r.type);
            const up = upsideOf(r);
            const met = isReco(r) && r.metadata?.current_price != null && r.metadata?.target_price != null && r.metadata.current_price >= r.metadata.target_price;
            return (
              <article
                key={r.slug}
                className="grid grid-cols-1 gap-5 border-b border-rule py-9 sm:grid-cols-[220px_minmax(0,1fr)_240px] sm:gap-12"
              >
                <div className="flex flex-col gap-1.5 font-sans text-[15px] text-ink-3">
                  <strong className="text-[16px] text-navy">{t.label.replace(/s$/, "")}</strong>
                  <span>{fmtDate(r.date)}</span>
                  <span>{r.sector}</span>
                </div>
                <div className="flex max-w-[720px] flex-col gap-3">
                  <h3 className="font-sans text-[clamp(26px,2.4vw,34px)] font-semibold leading-[1.1] tracking-[-0.02em]">
                    <Link href={r.href} className="no-underline">
                      {r.title}
                    </Link>
                  </h3>
                  <p className="text-[19px] leading-[1.6] text-ink-2">{r.summary}</p>
                </div>
                <div className="flex flex-col items-start gap-2 text-left font-sans sm:items-end sm:text-right">
                  {isReco(r) ? (
                    <>
                      <span className={`text-[19px] font-bold ${met ? "text-green" : "text-blue"}`}>{r.rating}</span>
                      {up != null && (
                        <span className="num text-[15px] text-ink-3">
                          Target {r.metadata?.target_price ? money(r.metadata.target_price) : "—"}, {pct(up)}
                        </span>
                      )}
                    </>
                  ) : (
                    r.readingTime && <span className="text-[15px] text-ink-3">{r.readingTime}</span>
                  )}
                  <Link href={r.href} className="mt-2 text-[17px] font-semibold no-underline">
                    {t.cta}
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </section>

      <section id="subscribe" className="dark">
        <div className="wrap band flex flex-wrap items-end justify-between gap-10 py-14 sm:py-20">
          <div className="flex max-w-[620px] flex-col gap-4">
            <h2 className="h-sub">Get the next report the day it&rsquo;s published</h2>
            <p className="lede">A weekly note, plus an email whenever a new initiation goes out. Free.</p>
          </div>
          <div className="w-full sm:w-[min(520px,100%)]">
            <SubscribeForm source="research" dark />
          </div>
        </div>
      </section>
    </>
  );
}
