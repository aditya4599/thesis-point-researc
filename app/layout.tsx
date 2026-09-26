import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerRibbon } from "@/components/DisclaimerRibbon";
import { StructuredData } from "@/components/structred";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesispointresearch.com"),

  title: {
    default:
      "ThesisPoint Research | Equity Research, Stock Reports & Market Analysis",
    template: "%s | ThesisPoint Research",
  },

  description:
    "Conviction-driven investment research — stock reports, pitch decks, and market intelligence for serious investors.",

  applicationName: "ThesisPoint Research",

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "https://www.thesispointresearch.com/",
  },

  openGraph: {
    title:
      "ThesisPoint Research | Equity Research, Stock Reports & Market Analysis",
    description:
      "Conviction-driven investment research — stock reports, pitch decks, and market intelligence for serious investors.",
    url: "https://www.thesispointresearch.com/",
    siteName: "ThesisPoint Research",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen pb-10 font-sans`}
      >
        <StructuredData />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <DisclaimerRibbon />
      </body>
    </html>
  );
}