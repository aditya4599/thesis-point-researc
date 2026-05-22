import type { ResearchItem } from "@/lib/types";
import type { ArticleBlock } from "@/lib/types/blocks";
import { parseContentBlocks } from "@/lib/types/blocks";
import type { ArticlePageMeta } from "@/lib/types/database";

export interface ArticleRenderContext {
  title: string;
  excerpt: string;
  subtitle?: string;
  heroImageUrl?: string;
  tags: string[];
  blocks: ArticleBlock[];
}

/**
 * Body blocks for the article column (excludes page-level hero when thumbnail is set).
 */
export function getArticleBodyBlocks(
  blocks: ArticleBlock[],
  hasPageHero: boolean
): ArticleBlock[] {
  if (!hasPageHero) return blocks;
  return blocks.filter((b) => b.type !== "hero");
}

export function resolveArticleBlocks(
  article: ResearchItem,
  contentBlocksRaw?: unknown
): ArticleRenderContext {
  const meta = (article.metadata ?? {}) as ArticlePageMeta;
  const parsed = parseContentBlocks(contentBlocksRaw);
  const heroImageUrl = article.thumbnailUrl ?? meta.hero_image_url;

  if (parsed.length > 0) {
    return {
      title: article.title,
      excerpt: article.summary,
      subtitle: meta.subtitle,
      heroImageUrl,
      tags: meta.tags ?? [],
      blocks: parsed,
    };
  }

  const blocks: ArticleBlock[] = [];

  if (meta.key_takeaways?.length) {
    blocks.push({
      type: "key_takeaways",
      data: {
        title: "Key takeaways",
        items: meta.key_takeaways,
      },
    });
  }

  if (article.content?.trim()) {
    blocks.push({
      type: "paragraph",
      data: { content: article.content },
    });
  } else if (article.summary) {
    blocks.push({
      type: "paragraph",
      data: { content: article.summary },
    });
  }

  return {
    title: article.title,
    excerpt: article.summary,
    subtitle: meta.subtitle,
    heroImageUrl,
    tags: meta.tags ?? [],
    blocks,
  };
}
