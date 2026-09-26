import { HeadingBlock } from "@/components/blocks/HeadingBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { DividerBlock } from "@/components/blocks/DividerBlock";
import { StatBlock } from "@/components/blocks/StatBlock";
import type { ArticleBlock } from "@/lib/types/blocks";

interface RenderBlocksProps {
  blocks: ArticleBlock[];
}

function blockKey(block: ArticleBlock, index: number): string {
  return block.id ?? `${block.type}-${index}`;
}

function BlockNode({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <HeadingBlock data={block.data} />;
    case "paragraph":
      return <ParagraphBlock data={block.data} />;
    case "quote":
      return <QuoteBlock data={block.data} />;
    case "image":
      return <ImageBlock data={block.data} />;
    case "divider":
      return <DividerBlock />;
    case "stat":
      return <StatBlock data={block.data} />;
    case "hero":
    case "key_takeaways":
      return null;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

/** Renders article body blocks only (no hero, no sidebar takeaways). */
export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks.length) return null;

  return (
    <div className="editorial-blocks">
      {blocks.map((block, index) => (
        <BlockNode
          key={blockKey(block, index)}
          block={block}
        />
      ))}
    </div>
  );
}
