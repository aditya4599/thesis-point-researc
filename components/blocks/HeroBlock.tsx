import Image from "next/image";
import type { HeroBlockData } from "@/lib/types/blocks";

export function HeroBlock({ data }: { data: HeroBlockData }) {
  return (
    <figure className="jpm-block-hero">
      <Image
        src={data.image}
        alt={data.alt ?? "Article illustration"}
        width={1400}
        height={788}
        className="jpm-block-hero-img"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
    </figure>
  );
}
