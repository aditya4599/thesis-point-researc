"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { StockReport } from "@/lib/types";

interface GapRulerProps {
  recos: StockReport[];
}

const START = 14; // where "price when published" sits on the ruler, in %

function position(upside: number) {
  return Math.min(94, START + upside * 1.15);
}

function money(value: number) {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function pct(n: number) {
  return (n > 0 ? "+" : "") + n.toFixed(1) + "%";
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function GapRuler({ recos }: GapRulerProps) {
  const [current, setCurrent] = useState(0);

  const data = useMemo(
    () =>
      recos.map((r) => {
        const upside =
          r.currentPrice > 0
            ? ((r.targetPrice - r.currentPrice) / r.currentPrice) * 100
            : 0;
        const met = r.currentPrice >= r.targetPrice && r.targetPrice > 0;
        return { ...r, upside, met };
      }),
    [recos]
  );

  if (!data.length) return null;

  const r = data[current];
  const tLeft = position(r.upside);

  return (
    <div className="gap border-t-2 border-navy py-9" style={{ paddingBottom: "clamp(56px, 6vw, 88px)" }}>
      <div className="gap-top flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
        <div className="gap-pick flex flex-col gap-[18px] font-sans">
          <p className="text-[17px] text-ink-3">
            Pick a recent Reco to see the gap we are underwriting.
          </p>
          <div className="picker flex flex-wrap gap-2.5">
            {data.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={i === current}
                onClick={() => setCurrent(i)}
                className="flex min-h-[52px] items-center gap-2.5 rounded-full border-[1.5px] border-navy bg-transparent px-[22px] font-sans text-[18px] font-bold text-navy aria-pressed:bg-navy aria-pressed:text-sage"
              >
                <span>{item.ticker}</span>
                <span className="font-normal">{item.rating}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="upside flex flex-col items-end gap-3.5 font-sans">
          <div className={`num text-[clamp(72px,10vw,144px)] font-semibold leading-[0.82] tracking-[-0.045em] ${r.met ? "text-green" : "text-blue"}`}>
            {pct(r.upside)}
          </div>
          <p className="text-[17px] text-ink-3">
            {r.met
              ? "upside to our target when published. Target Met."
              : "upside to our target on the day we published"}
          </p>
        </div>
      </div>

      <div className="ruler relative mx-3 my-10 hidden font-sans sm:block" style={{ height: 160 }}>
        <div className="absolute inset-x-0 h-0.5 bg-navy" style={{ top: 79 }} />
        <div
          className={`absolute h-3.5 transition-all duration-500 ${r.met ? "bg-green-bar" : "bg-blue"}`}
          style={{ top: 73, left: `${START}%`, width: `${tLeft - START}%` }}
        />
        <div
          className="absolute h-6 w-6 rounded-full bg-navy transition-all duration-500"
          style={{ top: 68, left: `calc(${START}% - 12px)` }}
        />
        <div
          className={`absolute h-[34px] w-[34px] rounded-full border-[5px] bg-sage transition-all duration-500 ${r.met ? "border-green-bar" : "border-blue"}`}
          style={{ top: 63, left: `calc(${tLeft}% - 17px)` }}
        />
        <div className="absolute flex flex-col items-center gap-0.5 whitespace-nowrap" style={{ top: 0, left: `${START}%`, transform: "translateX(-50%)" }}>
          <small className="text-[15px] text-ink-3">Price when published</small>
          <strong className="num text-[26px] font-semibold">{money(r.currentPrice)}</strong>
        </div>
        <div className="absolute flex flex-col items-center gap-0.5 whitespace-nowrap" style={{ top: 108, left: `${tLeft}%`, transform: "translateX(-50%)" }}>
          <small className="text-[15px] text-ink-3">Our target</small>
          <strong className="num text-[26px] font-semibold">{money(r.targetPrice)}</strong>
        </div>
      </div>

      <div className="gap-foot flex flex-wrap items-end justify-between gap-x-20 gap-y-6">
        <div>
          <p className="mb-2.5 font-sans text-[17px] text-ink-3">
            {r.company}, {r.ticker}. {r.sector}, published {fmtDate(r.date)}.
          </p>
          <p className="max-w-[820px] text-[clamp(22px,2.2vw,30px)] leading-[1.35] tracking-[-0.005em]">
            {r.summary}
          </p>
        </div>
        <Link href={`/research/stock-reports/${r.slug}`} className="btn">
          Read the {r.company} report
        </Link>
      </div>
    </div>
  );
}
