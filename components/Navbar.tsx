"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

const researchLinks = [
  { href: "/research/articles", label: "Articles" },
  { href: "/research/stock-reports", label: "Stock Reports" },
  { href: "/research/pitches", label: "Pitch Decks" },
  { href: "/research/sector-notes", label: "Sector Notes" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  const isResearch = pathname?.startsWith("/research");
  const isAbout = pathname?.startsWith("/about");

  return (
    <header className="site-header border-b border-rule bg-sage">
      <div className="wrap flex items-center justify-between gap-6 py-6">
        <BrandLogo variant="navbar" />

        <nav
          aria-label="Main"
          className="hidden items-center gap-9 font-sans text-[17px] md:flex"
        >
          <div
            className="relative"
            onMouseEnter={() => setResearchOpen(true)}
            onMouseLeave={() => setResearchOpen(false)}
          >
            <Link
              href="/research"
              aria-current={isResearch ? "page" : undefined}
              className={cn(
                "flex items-center gap-1 no-underline",
                isResearch && "border-b-2 border-blue pb-1 font-semibold"
              )}
            >
              Research
              <ChevronDown className="h-4 w-4" />
            </Link>
            <AnimatePresence>
              {researchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full w-[420px] rounded-2xl border border-rule bg-paper p-3 shadow-card-hover"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {researchLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl px-3 py-3 text-[16px] font-medium no-underline hover:bg-sage-2"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/research"
                    className="mt-2 block rounded-xl border-t border-rule px-3 pt-3 text-center text-[15px] font-semibold no-underline"
                  >
                    View Research Library &rarr;
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/about"
            aria-current={isAbout ? "page" : undefined}
            className={cn(
              "no-underline",
              isAbout && "border-b-2 border-blue pb-1 font-semibold"
            )}
          >
            About
          </Link>
          <Link href="/#subscribe" className="btn btn-dark">
            Subscribe
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-navy" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-paper p-6 shadow-xl md:hidden"
            >
              <div className="flex justify-end">
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-navy" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-4 font-sans">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-3">
                  Research
                </p>
                {researchLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium no-underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/research"
                  className="text-lg font-medium no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  All Research
                </Link>
                <hr className="border-rule" />
                <Link
                  href="/about"
                  className="text-lg font-medium no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/#subscribe"
                  className="btn btn-dark mt-2 w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
