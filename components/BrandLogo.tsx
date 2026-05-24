import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "navbar" | "footer";
  className?: string;
}

export function BrandLogo({ variant = "navbar", className }: BrandLogoProps) {
  const isNavbar = variant === "navbar";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
    >
      <Image
        src="/image.png"
        alt=""
        width={isNavbar ? 44 : 36}
        height={isNavbar ? 44 : 36}
        className={cn(
          "shrink-0",
          isNavbar ? "h-14 w-14" : "h-10 w-10"
        )}
        priority={isNavbar}
      />
      <div className="min-w-0 text-center">
        <span
          className={cn(
            "block font-serif font-bold leading-tight text-white",
            isNavbar ? "text-2xl tracking-tight" : "text-xl"
          )}
        >
          ThesisPoint
        </span>

        { (
          <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
            Research
          </span>
        )}
      </div>
    </Link>
  );
}