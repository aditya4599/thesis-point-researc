import { HeadingBlock } from "@/components/blocks/HeadingBlock";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";
import { KeyTakeawaysBlock } from "@/components/blocks/KeyTakeawaysBlock";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import type { ArticleBlock } from "@/lib/types/blocks";
import { DividerBlock } from "@/components/blocks/DividerBlock";
import { StatBlock } from "@/components/blocks/StatBlock";

interface RenderBlocksProps {
  blocks: ArticleBlock[];
}

function blockKey(block: ArticleBlock, index: number): string {
  return block.id ?? `${block.type}-${index}`;
}

function BlockNode({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} />;
    case "heading":
      return <HeadingBlock data={block.data} />;
    case "paragraph":
      return <ParagraphBlock data={block.data} />;
    case "quote":
      return <QuoteBlock data={block.data} />;
    case "image":
      return <ImageBlock data={block.data} />;
    case "key_takeaways":
      return <KeyTakeawaysBlock data={block.data} />;
    case "divider":
      return <DividerBlock />;
    case "stat":
      return <StatBlock data={block.data} />;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

/**
 * Unified article block renderer (JP Morgan Insights–style components).
 */
export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks.length) return null;

  return (
    <div className="jpm-blocks">
      {blocks.map((block, index) => (
        <BlockNode key={blockKey(block, index)} block={block} />
      ))}
    </div>
  );
}
