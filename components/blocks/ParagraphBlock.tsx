import type { ParagraphBlockData } from "@/lib/types/blocks";

export function ParagraphBlock({ data }: { data: ParagraphBlockData }) {
  const content = data.content.trim();
  if (!content) return null;

  if (content.includes("<")) {
    return (
      <div
        className="editorial-paragraph editorial-paragraph-html"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return <p className="editorial-paragraph">{content}</p>;
}
