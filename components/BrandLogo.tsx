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
    <Link href="/" className={cn("logo block", className)}>
      <Image
        src="/logo-tpr.png"
        alt="ThesisPoint Research"
        width={256}
        height={48}
        className={isNavbar ? "h-12 w-auto" : "h-11 w-auto"}
        priority={isNavbar}
      />
    </Link>
  );
}