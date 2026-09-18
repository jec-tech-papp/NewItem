import { getFeaturedArticles, getSettings } from "@/lib/data";
import { buildSiteMetadata, buildStructuredData } from "@/lib/seo";
import { HomePage } from "@/components/HomePage";
import { StructuredData } from "@/components/seo/StructuredData";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return buildSiteMetadata(settings);
}

export default async function Page() {
  const [settings, articles] = await Promise.all([
    getSettings(),
    getFeaturedArticles(),
  ]);

  const structuredData = buildStructuredData(settings, articles);

  return (
    <>
      <StructuredData data={structuredData} />
      <HomePage settings={settings} articles={articles} />
    </>
  );
}
