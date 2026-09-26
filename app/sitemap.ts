import { MetadataRoute } from "next";
import { getPublishedReports } from "@/lib/queries/reports";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.thesispointresearch.com";

  const articles = await getPublishedReports({
    category: "article",
  });
  

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/research/articles/${article.slug}`,
    lastModified: new Date(),
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {

    url: `${baseUrl}/research`,

    lastModified: new Date(),

    },
    ...articleUrls,
  ];
}