/**
 * Article content blocks — stored in research_reports.content_blocks (JSONB).
 * @see docs/CONTENT_GUIDE.md
 */

export type ArticleBlockType =
  | "hero"
  | "heading"
  | "paragraph"
  | "quote"
  | "image"
  | "key_takeaways"
  | "divider"
  | "stat";
export interface DividerBlockData {}

export interface HeroBlockData {
  image: string;
  alt?: string;
  category?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  publishedAt?: string;
}

export interface HeadingBlockData {
  text: string;
  level?: 2 | 3;
}

export interface ParagraphBlockData {
  content: string;
}

export interface QuoteBlockData {
  quote: string;
  author?: string;
}

export interface ImageBlockData {
  url: string;
  alt?: string;
  caption?: string;
}

export interface KeyTakeawaysBlockData {
  title?: string;
  items: string[];
}
export interface StatBlockData {
  value: string;
  label: string;
}
export type ArticleBlock =
  | { id?: string; type: "hero"; data: HeroBlockData }
  | { id?: string; type: "heading"; data: HeadingBlockData }
  | { id?: string; type: "paragraph"; data: ParagraphBlockData }
  | { id?: string; type: "quote"; data: QuoteBlockData }
  | { id?: string; type: "image"; data: ImageBlockData }
  | { id?: string; type: "key_takeaways"; data: KeyTakeawaysBlockData }
  | { id?: string; type: "divider"; data: DividerBlockData }
  | { id?: string; type: "stat"; data: StatBlockData };

/** @deprecated Use ArticleBlock */
export type ContentBlock = ArticleBlock;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Normalizes CMS / legacy block shapes into the canonical ArticleBlock union.
 */
export function normalizeBlock(raw: unknown): ArticleBlock | null {
  const block = asRecord(raw);
  if (!block || typeof block.type !== "string") return null;

  const data = asRecord(block.data) ?? {};
  const id = typeof block.id === "string" ? block.id : undefined;

  switch (block.type) {
    case "heading":
    case "section":
      return {
        id,
        type: "heading",
        data: {
          text: String(data.text ?? data.heading ?? ""),
          level: (data.level === 3 ? 3 : 2) as 2 | 3,
        },
      };

    case "paragraph": {
      const content = String(
        data.content ?? data.html ?? data.text ?? ""
      ).trim();
      if (!content) return null;
      return { id, type: "paragraph", data: { content } };
    }

    case "key_takeaways":
    case "takeaways": {
      const items = Array.isArray(data.items)
        ? data.items.map((i) => String(i)).filter(Boolean)
        : [];
      if (!items.length) return null;
      return {
        id,
        type: "key_takeaways",
        data: {
          title: typeof data.title === "string" ? data.title : undefined,
          items,
        },
      };
    }

    case "quote": {
      const quote = String(data.quote ?? data.text ?? "").trim();
      if (!quote) return null;
      return {
        id,
        type: "quote",
        data: {
          quote,
          author:
            typeof data.author === "string" ? data.author : undefined,
        },
      };
    }

    case "hero": {
      const image = String(data.image ?? data.imageUrl ?? "").trim();
      if (!image) return null;
      return {
        id,
        type: "hero",
        data: {
          image,
          alt:
            typeof data.alt === "string"
              ? data.alt
              : typeof data.imageAlt === "string"
                ? data.imageAlt
                : undefined,
        },
      };
    }

    case "image": {
      const url = String(data.url ?? "").trim();
      if (!url) return null;
      return {
        id,
        type: "image",
        data: {
          url,
          alt: typeof data.alt === "string" ? data.alt : undefined,
          caption:
            typeof data.caption === "string" ? data.caption : undefined,
        },
      };
    }
    case "divider":
      return {
        id,
        type: "divider",
        data: {},
      };
    case "stat": {
      const value = String(data.value ?? "").trim();
      const label = String(data.label ?? "").trim();

      if (!value || !label) return null;

      return {
        id,
        type: "stat",
        data: {
          value,
          label,
        },
      };
    }

    default:
      return null;
  }
}

export function parseContentBlocks(raw: unknown): ArticleBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(normalizeBlock)
    .filter((b): b is ArticleBlock => b !== null);
}
