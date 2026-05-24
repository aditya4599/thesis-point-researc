interface HeroBlockProps {
  data: {
    image: string;
    alt?: string;
    category?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    publishedAt?: string;
  };
}

export function HeroBlock({ data }: HeroBlockProps) {
  return (
    <section className="mb-20">
      <div className="overflow-hidden rounded-[32px]">
        <img
          src={data.image}
          alt={data.alt || ""}
          className="h-[560px] w-full object-cover"
        />
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        {data.category && (
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
            {data.category}
          </span>
        )}

        {data.title && (
          <h1 className="mt-5 font-serif text-6xl leading-[1.05] tracking-tight text-neutral-950">
            {data.title}
          </h1>
        )}

        {data.subtitle && (
          <p className="mt-6 text-2xl leading-relaxed text-neutral-600">
            {data.subtitle}
          </p>
        )}

        {(data.author || data.publishedAt) && (
          <div className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-neutral-500">
            {data.author && <span>{data.author}</span>}

            {data.author && data.publishedAt && (
              <span>•</span>
            )}

            {data.publishedAt && (
              <span>{data.publishedAt}</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}