import Image from "next/image";
import type { ImageBlockData } from "@/lib/types/blocks";

export function ImageBlock({ data }: { data: ImageBlockData }) {
  return (
    <figure className="jpm-block-image">
      <Image
        src={data.url}
        alt={data.alt ?? data.caption ?? "Article image"}
        width={1200}
        height={675}
        className="jpm-block-image-img"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {data.caption && (
        <figcaption className="jpm-block-image-caption">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}
