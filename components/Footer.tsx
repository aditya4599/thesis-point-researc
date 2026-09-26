import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="site-footer bg-sage-2 font-sans">
      <div className="wrap flex flex-col gap-12 py-14">
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-10">
          <div className="flex max-w-[360px] flex-col gap-4">
            <BrandLogo variant="footer" />
            <p className="text-[17px] leading-snug text-ink-2">
              Independent research on US equities.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/company/thesispoint-research"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Image
                  src="/Linkedin.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-70 transition hover:opacity-100"
                />
              </a>
              <a
                href="https://www.instagram.com/thesispointresearch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/instagram.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="opacity-70 transition hover:opacity-100"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-24 gap-y-10 text-[17px]">
            <div className="flex flex-col gap-3.5">
              <span className="text-[15px] text-ink-3">Research</span>
              <Link href="/research" className="no-underline">
                Library
              </Link>
              <Link href="/research/stock-reports" className="no-underline">
                Stock reports
              </Link>
              <Link href="/research/articles" className="no-underline">
                Articles
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              <span className="text-[15px] text-ink-3">Company</span>
              <Link href="/about" className="no-underline">
                About
              </Link>
              <Link href="/contact" className="no-underline">
                Contact
              </Link>
              <Link href="/disclaimer" className="no-underline">
                Disclaimer
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              <span className="text-[15px] text-ink-3">Follow</span>
              <a
                href="https://www.linkedin.com/company/thesispoint-research"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/thesispointresearch"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <p className="max-w-[1000px] border-t border-rule-2 pt-6 text-[15px] leading-relaxed text-ink-3">
          &copy; {new Date().getFullYear()} ThesisPoint Research. Published for
          information only; nothing on this site is investment advice or a
          recommendation to buy or sell a security. ThesisPoint Research is
          not registered with SEBI as a research analyst.
        </p>
      </div>
    </footer>
  );
}
