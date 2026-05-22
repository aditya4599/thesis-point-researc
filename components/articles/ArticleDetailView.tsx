import Image from "next/image";
import Link from "next/link";

import { ArticleRenderer } from "@/components/ArticleRenderer";
import { AuthorCard } from "@/components/AuthorCard";
import { ContentCard } from "@/components/ContentCard";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { SectorBadge } from "@/components/SectorBadge";
import { ShareButton } from "@/components/ShareButton";

import { toArticle } from "@/lib/adapters";
import {
  getArticleBodyBlocks,
  type ArticleRenderContext,
} from "@/lib/content/resolve-article-blocks";
import type { ResearchItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

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
  const heroImage = context.heroImageUrl;
  const intro = context.subtitle ?? context.excerpt;
  const bodyBlocks = getArticleBodyBlocks(context.blocks, Boolean(heroImage));

  return (
    <div className="jpm-article">
      <header className="jpm-article-header">
        <div className="jpm-article-header-inner">
          <nav className="jpm-breadcrumb" aria-label="Breadcrumb">
            <Link href="/research">Research</Link>
            <span className="jpm-breadcrumb-sep" aria-hidden>
              /
            </span>
            <Link href="/research/articles">Articles</Link>
            <span className="jpm-breadcrumb-sep" aria-hidden>
              /
            </span>
            <span className="jpm-breadcrumb-current">{article.sector}</span>
          </nav>

          <div className="jpm-article-meta-row">
            <SectorBadge sector={article.sector} />
            {context.tags.map((tag) => (
              <span key={tag} className="jpm-tag">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="jpm-article-title">{context.title}</h1>

          <p className="jpm-article-date">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.readingTime && (
              <span className="font-normal text-text-muted">
                {" "}
                · {article.readingTime}
              </span>
            )}
          </p>

          {intro && <p className="jpm-article-deck">{intro}</p>}
        </div>
      </header>

      {heroImage && (
        <div className="jpm-article-hero-wrap">
          <div className="jpm-article-hero-inner">
            <Image
              src={heroImage}
              alt={context.title}
              width={1440}
              height={810}
              priority
              className="jpm-article-hero-img"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      <div className="jpm-article-body-wrap">
        <div className="jpm-article-layout">
          <article className="jpm-article-main">
            <ArticleRenderer blocks={bodyBlocks} />

            <div className="jpm-article-share">
              <span className="jpm-article-share-label">Share</span>
              <ShareButton
                title={context.title}
                summary={context.excerpt}
              />
            </div>

            {article.authorData && (
              <section className="jpm-article-author" aria-label="Author">
                <p className="jpm-article-author-label">About the author</p>
                <AuthorCard author={article.authorData} />
              </section>
            )}
          </article>

          <aside className="jpm-article-sidebar">
            <p className="jpm-sidebar-byline">
              <span className="font-medium text-midnight">
                {article.author}
              </span>
            </p>
            {context.excerpt && (
              <div className="jpm-sidebar-card">
                <h2 className="jpm-sidebar-heading">At a glance</h2>
                <p className="jpm-sidebar-text">{context.excerpt}</p>
              </div>
            )}
            <NewsletterBanner compact />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="jpm-related">
            <h2 className="jpm-related-title">You may also like</h2>
            <div className="jpm-related-grid">
              {related.map((a) => (
                <ContentCard
                  key={a.id}
                  type="article"
                  data={toArticle(a)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
