import Link from "next/link";
import { GapRuler } from "@/components/GapRuler";
import { SubscribeForm } from "@/components/SubscribeForm";
import { toArticle, toStockReport } from "@/lib/adapters";
import type { ResearchItem } from "@/lib/types";

interface HomePageContentProps {
  recentReports: ResearchItem[];
  articles: ResearchItem[];
}

const team = [
  {
    initials: "RB",
    name: "Ruhaan Bajaj",
    role: "Co-founder and research lead.",
    href: "https://www.linkedin.com/in/ruhaan-bajaj-a69631305/",
    alt: false,
  },
  {
    initials: "VM",
    name: "Vansh Mittal",
    role: "Co-founder and research lead.",
    href: "https://www.linkedin.com/in/vamitt/",
    alt: true,
  },
];

export function HomePageContent({ recentReports, articles }: HomePageContentProps) {
  const recos = recentReports.map(toStockReport);
  const reads = articles.map(toArticle);

  return (
    <>
      <section className="wrap hero flex flex-col gap-10 pt-12 sm:pt-16 md:gap-16">
        <div className="hero-top flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-20">
          <h1 className="h-display max-w-[900px]">
            Research for the gap between price and value.
          </h1>
          <div className="hero-aside flex w-full flex-col gap-7 pb-3 lg:w-[380px] lg:shrink-0">
            <p className="lede">
              Independent initiations on US equities. Every report carries a
              rating, a price target, and the risks that would change our
              mind.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/research" className="btn btn-primary">
                Browse the research
              </Link>
              <Link href="#subscribe" className="btn">
                Get reports by email
              </Link>
            </div>
          </div>
        </div>

        <GapRuler recos={recos} />
      </section>

      {reads.length > 0 && (
        <section className="wrap reads flex flex-col gap-12 py-16 sm:py-20">
          <div className="section-head rule-top">
            <h2 className="h-section">Longer reads</h2>
            <Link href="/research/articles" className="font-sans text-[17px] font-semibold no-underline">
              All articles
            </Link>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-20">
            {reads.map((a) => (
              <article key={a.slug} className="flex flex-col gap-4">
                <span className="font-sans text-[16px] text-ink-3">
                  {a.sector}
                  {a.readTime ? `, ${a.readTime}` : ""}
                </span>
                <h3 className="font-sans text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1.08] tracking-[-0.025em]">
                  <Link href={`/research/articles/${a.slug}`} className="no-underline">
                    {a.title}
                  </Link>
                </h3>
                <p className="max-w-[560px] text-[20px] leading-[1.6] text-ink-2">
                  {a.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section id="subscribe" className="wrap subscribe flex flex-col gap-14 py-16 sm:py-20 lg:flex-row lg:gap-28">
        <div className="flex flex-col gap-7 lg:w-[640px] lg:shrink-0">
          <h2 className="h-section">Get the next report the day it&rsquo;s published</h2>
          <p className="lede">
            A weekly note, plus an email whenever a new initiation goes out.
            Free.
          </p>
          <SubscribeForm source="homepage" />
        </div>
        <div className="flex flex-1 flex-col gap-7 font-sans">
          <h3 className="text-[18px] font-medium text-ink-3">Who writes it</h3>
          {team.map((person, i) => (
            <div
              key={person.name}
              className={`flex items-center gap-5 ${i > 0 ? "border-t border-rule pt-7" : ""}`}
            >
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[22px] font-semibold ${
                  person.alt ? "bg-blue text-white" : "bg-navy text-sage"
                }`}
              >
                {person.initials}
              </div>
              <div>
                <a href={person.href} target="_blank" rel="noopener noreferrer" className="text-[26px] font-semibold tracking-[-0.015em] no-underline">
                  {person.name}
                </a>
                <p className="mt-1 text-[17px] text-ink-2">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
