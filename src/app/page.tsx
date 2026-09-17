import { getFeaturedArticles, getSettings } from "@/lib/data";
import { HomePage } from "@/components/HomePage";

export default async function Page() {
  const [settings, articles] = await Promise.all([
    getSettings(),
    getFeaturedArticles(),
  ]);

  return <HomePage settings={settings} articles={articles} />;
}
