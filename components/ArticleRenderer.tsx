import { RenderBlocks } from "@/components/RenderBlocks";
import { getArticleBodyBlocks } from "@/lib/content/resolve-article-blocks";
import type { ArticleBlock } from "@/lib/types/blocks";

interface ArticleRendererProps {
  blocks: ArticleBlock[];
}

/** Article body column — blocks only, no layout chrome. */
export function ArticleRenderer({ blocks }: ArticleRendererProps) {
  const bodyBlocks = getArticleBodyBlocks(blocks);
  return <RenderBlocks blocks={bodyBlocks} />;
}
