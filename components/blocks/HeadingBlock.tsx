import type { HeadingBlockData } from "@/lib/types/blocks";

export function HeadingBlock({ data }: { data: HeadingBlockData }) {
  if (!data.text.trim()) return null;

  if (data.level === 3) {
    return <h3 className="jpm-block-heading-sm">{data.text}</h3>;
  }

  return <h2 className="jpm-block-heading">{data.text}</h2>;
}
