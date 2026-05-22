import type { QuoteBlockData } from "@/lib/types/blocks";

export function QuoteBlock({ data }: { data: QuoteBlockData }) {
  return (
    <figure className="jpm-block-quote">
      <blockquote className="jpm-block-quote-text">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      {data.author && (
        <figcaption className="jpm-block-quote-author">
          {data.author}
        </figcaption>
      )}
    </figure>
  );
}
