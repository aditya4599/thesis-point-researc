import { AuthorCard } from "@/components/AuthorCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getAuthors } from "@/lib/queries/authors";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About",
};

const principles = [
  {
    title: "Independent",
    desc: "No investment-banking ties. Our ratings reflect conviction, not relationships.",
  },
  {
    title: "Built on data",
    desc: "Every thesis rests on our own models, primary research and assumptions we show you.",
  },
  {
    title: "Long-term",
    desc: "We look for structural winners and durable advantages, not short-term noise.",
  },
];

const method = [
  {
    n: 1,
    title: "Start from the filings",
    desc: "Every figure comes from the company's own annual reports and filings, not a data aggregator.",
  },
  {
    n: 2,
    title: "Build the model ourselves",
    desc: "Three linked statements and our own forecasts, so you can see which assumption moves the answer.",
  },
  {
    n: 3,
    title: "Value it the way it earns",
    desc: "Discounted cash flow for growth companies, excess returns for banks and lenders, normalised multiples for cyclicals.",
  },
  {
    n: 4,
    title: "Say what would prove us wrong",
    desc: "Each report names the risks to the thesis and what would make us change the rating.",
  },
];

export default async function AboutPage() {
  const team = await getAuthors();

  return (
    <>
      <section className="wrap about-hero flex flex-col flex-wrap items-start justify-between gap-10 pt-12 sm:pt-16 lg:flex-row lg:items-end lg:gap-20">
        <h1 className="h-display">About ThesisPoint Research</h1>
        <blockquote className="m-0 max-w-[520px] text-[clamp(20px,1.8vw,24px)] leading-[1.5] text-ink-2">
          We publish research we would own: a clear thesis, honest risks, and
          the discipline to change our minds when the facts change.
        </blockquote>
      </section>

      <section aria-label="Our approach" className="wrap principles grid gap-10 pb-16 pt-10 sm:grid-cols-3 sm:gap-16 sm:pb-28">
        {principles.map((p) => (
          <div key={p.title} className="flex flex-col gap-3 border-t-2 border-navy pt-5">
            <h3 className="font-sans text-[26px] font-semibold tracking-[-0.015em]">{p.title}</h3>
            <p className="text-[19px] leading-[1.6] text-ink-2">{p.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-sage-2 py-16 sm:py-24">
        <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-24">
          <div className="flex flex-col gap-7 lg:w-[440px] lg:shrink-0">
            <h2 className="h-section">How a report gets written</h2>
            <p className="lede">Four steps sit behind every Reco we publish.</p>
          </div>
          <ol className="m-0 grid flex-1 list-none gap-14 p-0 sm:grid-cols-2 sm:gap-16">
            {method.map((step) => (
              <li key={step.n} className="flex flex-col gap-3 border-t-2 border-navy pt-5">
                <span className="font-sans text-[44px] font-semibold leading-none text-blue">
                  {step.n}
                </span>
                <h3 className="font-sans text-[26px] font-semibold tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p className="text-[19px] leading-[1.6] text-ink-2">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap people-full flex flex-col gap-10 py-16 sm:py-24">
        <h2 className="h-section">Who writes it</h2>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-20">
          {team.map((member) => (
            <AuthorCard key={member.id} author={member} />
          ))}
        </div>
      </section>

      <section id="subscribe" className="dark">
        <div className="wrap band flex flex-wrap items-end justify-between gap-10 py-14 sm:py-20">
          <div className="flex max-w-[620px] flex-col gap-4">
            <h2 className="h-sub">Get the next report the day it&rsquo;s published</h2>
            <p className="lede">
              A weekly note, plus an email whenever a new initiation goes out.
              Free.
            </p>
          </div>
          <div className="w-full sm:w-[min(520px,100%)]">
            <SubscribeForm source="about" dark />
          </div>
        </div>
      </section>
    </>
  );
}
