import type { AuthorRow } from "@/lib/types/database";

interface AuthorCardProps {
  author: AuthorRow;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initials =
    author.initials ??
    author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  return (
    <article className="flex flex-col gap-4 font-sans">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-[22px] font-semibold text-sage">
        {initials}
      </div>
      <div>
        {author.role && <p className="text-[17px] text-ink-3">{author.role}</p>}
        <h3 className="text-[32px] font-semibold tracking-[-0.02em]">
          {author.linkedin_url ? (
            <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer" className="no-underline">
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </h3>
      </div>
      {author.bio && (
        <p className="font-serif text-[19px] leading-[1.6] text-ink-2">{author.bio}</p>
      )}
    </article>
  );
}
