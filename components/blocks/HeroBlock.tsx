import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { HeroBlockData } from "@/lib/types/blocks";
import { ShareButton } from "@/components/ShareButton";

export interface HeroBlockProps {
  data: HeroBlockData;
  linkedinUrl?: string | null;
  shareTitle: string;
  shareSummary: string;
}

/**
 * Left sticky editorial panel (metadata + takeaways + socials).
 * Does not render the hero image — that lives in the main column only.
 */
export function HeroBlock({
  data,
  linkedinUrl,
  shareTitle,
  shareSummary,
}: HeroBlockProps) {
  return (
    <aside className="editorial-sidebar-panel" aria-label="Article details">
      {data.category && (
        <p className="editorial-sidebar-category">{data.category}</p>
      )}

      {data.title && (
        <h1 className="editorial-sidebar-title">{data.title}</h1>
      )}

      {data.publishedAt && (
        <p className="editorial-sidebar-date">{data.publishedAt}</p>
      )}

      {data.subtitle && (
        <p className="editorial-sidebar-subtitle">{data.subtitle}</p>
      )}

      {data.takeaways && data.takeaways.length > 0 && (
        <div className="editorial-sidebar-takeaways">
          <h2 className="editorial-sidebar-takeaways-heading">
            <span>Key</span>{" "}
            <span className="editorial-accent">takeaways</span>
          </h2>
          <ul className="editorial-sidebar-takeaways-list">
            {data.takeaways.map((item, index) => (
              <li key={`sidebar-takeaway-${index}`}>
                <span className="editorial-sidebar-bullet" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="editorial-sidebar-socials">
        <ShareButton title={shareTitle} summary={shareSummary} />
        {linkedinUrl && (
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-sidebar-social-link"
            aria-label="Author on LinkedIn"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        )}
      </div>
    </aside>
  );
}
