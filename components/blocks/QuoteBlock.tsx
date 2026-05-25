import type { QuoteBlockData } from "@/lib/types/blocks";

export function QuoteBlock({ data }: { data: QuoteBlockData }) {
  return (
    <figure className="editorial-block-quote">
      <blockquote className="editorial-block-quote-text">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      {data.author && (
        <figcaption className="editorial-block-quote-author">
          {data.author}
        </figcaption>
      )}
    </figure>
  );
}
