import Image from "next/image";
import Link from "next/link";

import { ArticleRenderer } from "@/components/ArticleRenderer";
import { AuthorCard } from "@/components/AuthorCard";
import { ContentCard } from "@/components/ContentCard";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { toArticle } from "@/lib/adapters";
import {
  buildSidebarData,
  resolveHeroImageUrl,
  type ArticleRenderContext,
} from "@/lib/content/resolve-article-blocks";
import type { ResearchItem } from "@/lib/types";

interface ArticleDetailViewProps {
  article: ResearchItem;
  context: ArticleRenderContext;
  related: ResearchItem[];
}

export function ArticleDetailView({
  article,
  context,
  related,
}: ArticleDetailViewProps) {
  const blocks = context.blocks;
  const heroImageUrl = resolveHeroImageUrl(context, blocks);
  const sidebarData = buildSidebarData(article, context, blocks);

  return (
    <div className="editorial-article">
      <nav
        className="editorial-breadcrumb-bar"
        aria-label="Breadcrumb"
      >
        <div className="editorial-breadcrumb-inner">
          <Link href="/research">Research</Link>
          <span aria-hidden>/</span>
          <Link href="/research/articles">Articles</Link>
        </div>
      </nav>

      <div className="editorial-article-shell">
        <div className="editorial-article-grid">
          <aside className="editorial-sidebar-col sticky top-24 self-start h-fit">
            <HeroBlock
              data={sidebarData}
              linkedinUrl={article.authorData?.linkedin_url}
              shareTitle={context.title}
              shareSummary={context.excerpt}
            />
          </aside>

          <div className="editorial-main-col">
            {heroImageUrl && (
              <figure className="editorial-hero-figure">
                <Image
                  src={heroImageUrl}
                  alt={context.title}
                  width={1600}
                  height={900}
                  priority
                  className="editorial-hero-image"
                  sizes="(max-width: 1024px) 100vw, min(820px, 65vw)"
                />
              </figure>
            )}

            <div className="editorial-content-body">
              <ArticleRenderer blocks={blocks} />
            </div>

            {article.authorData && (
              <section
                className="editorial-author"
                aria-label="About the author"
              >
                <p className="editorial-author-label">About the author</p>
                <AuthorCard author={article.authorData} />
              </section>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="editorial-related">
          <div className="editorial-related-inner">
            <h2 className="editorial-related-title">You may also like</h2>
            <div className="editorial-related-grid">
              {related.map((a) => (
                <ContentCard
                  key={a.id}
                  type="article"
                  data={toArticle(a)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
