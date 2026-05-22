import type { KeyTakeawaysBlockData } from "@/lib/types/blocks";

export function KeyTakeawaysBlock({ data }: { data: KeyTakeawaysBlockData }) {
  if (!data.items.length) return null;

  const title = data.title ?? "Key takeaways";
  const [firstWord, ...rest] = title.split(" ");
  const restWords = rest.join(" ");

  return (
    <section className="jpm-block-takeaways" aria-label={title}>
      <h2 className="jpm-block-takeaways-title">
        <span className="text-midnight">{firstWord}</span>
        {restWords ? (
          <>
            {" "}
            <span className="text-jpm-gold">{restWords}</span>
          </>
        ) : null}
      </h2>
      <ul className="jpm-block-takeaways-list">
        {data.items.map((item, index) => (
          <li key={`takeaway-${index}`} className="jpm-block-takeaways-item">
            <span className="jpm-block-takeaways-bullet" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
