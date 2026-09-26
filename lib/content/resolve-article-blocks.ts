import type { ResearchItem } from "@/lib/types";
import type { ArticleBlock, HeroBlockData } from "@/lib/types/blocks";
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

export function findHeroBlock(
  blocks: ArticleBlock[]
): Extract<ArticleBlock, { type: "hero" }> | undefined {
  return blocks.find((b): b is Extract<ArticleBlock, { type: "hero" }> =>
    b.type === "hero"
  );
}

/** Hero image: thumbnail first, then hero block image field. */
export function resolveHeroImageUrl(
  context: ArticleRenderContext,
  blocks: ArticleBlock[]
): string | undefined {
  if (context.heroImageUrl) return context.heroImageUrl;
  const hero = findHeroBlock(blocks);
  return hero?.data.image;
}

/** Body column only — never hero or sidebar takeaways. */
export function getArticleBodyBlocks(blocks: ArticleBlock[]): ArticleBlock[] {
  return blocks.filter(
    (b) => b.type !== "hero" && b.type !== "key_takeaways"
  );
}

/** Takeaways for left sidebar (metadata, blocks, or hero block data). */
export function resolveSidebarTakeaways(
  meta: ArticlePageMeta,
  blocks: ArticleBlock[]
): string[] {
  if (meta.key_takeaways?.length) return meta.key_takeaways;

  const fromBlocks = blocks
    .filter((b): b is Extract<ArticleBlock, { type: "key_takeaways" }> =>
      b.type === "key_takeaways"
    )
    .flatMap((b) => b.data.items);

  if (fromBlocks.length) return fromBlocks;

  const hero = findHeroBlock(blocks);
  return hero?.data.takeaways ?? [];
}

export function buildSidebarData(
  article: ResearchItem,
  context: ArticleRenderContext,
  blocks: ArticleBlock[]
): HeroBlockData {
  const meta = (article.metadata ?? {}) as ArticlePageMeta;
  const hero = findHeroBlock(blocks);

  return {
    image: resolveHeroImageUrl(context, blocks) ?? "",
    category: hero?.data.category ?? article.sector,
    title: hero?.data.title ?? context.title,
    subtitle: hero?.data.subtitle ?? context.subtitle ?? context.excerpt,
    author: hero?.data.author ?? article.author,
    publishedAt:
      hero?.data.publishedAt ??
      new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    takeaways: resolveSidebarTakeaways(meta, blocks),
  };
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
