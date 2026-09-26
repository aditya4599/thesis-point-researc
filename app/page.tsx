import { HomePageContent } from "@/components/HomePageContent";
import { getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recentReports, articles] = await Promise.all([
    getPublishedReports({ category: "stock-report", limit: 3 }),
    getPublishedReports({ category: "article", limit: 2 }),
  ]);

  return <HomePageContent recentReports={recentReports} articles={articles} />;
}
