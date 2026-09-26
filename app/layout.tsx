import type { Metadata } from "next";
import { Familjen_Grotesk, Source_Serif_4 } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerRibbon } from "@/components/DisclaimerRibbon";
import { StructuredData } from "@/components/structred";
import "./globals.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-familjen",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
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
        className={`${familjen.variable} ${sourceSerif.variable} min-h-screen bg-sage pb-10 font-serif text-navy antialiased`}
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