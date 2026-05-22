import { RenderBlocks } from "@/components/RenderBlocks";
import type { ArticleBlock } from "@/lib/types/blocks";

interface ArticleRendererProps {
  blocks: ArticleBlock[];
}

/** Article body renderer — delegates to the unified RenderBlocks component. */
export function ArticleRenderer({ blocks }: ArticleRendererProps) {
  return <RenderBlocks blocks={blocks} />;
}
