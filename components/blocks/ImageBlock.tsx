import Image from "next/image";
import type { ImageBlockData } from "@/lib/types/blocks";

export function ImageBlock({ data }: { data: ImageBlockData }) {
  return (
    <figure className="editorial-block-image">
      <Image
        src={data.url}
        alt={data.alt ?? data.caption ?? "Article image"}
        width={1200}
        height={675}
        className="editorial-block-image-img"
        sizes="(max-width: 1024px) 100vw, 820px"
      />
      {data.caption && (
        <figcaption className="editorial-block-image-caption">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}
