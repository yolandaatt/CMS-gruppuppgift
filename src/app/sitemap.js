import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";

// 🚀 Initiera Storyblok
initStoryblok();

export default async function sitemap() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/links", {
    version: "published",
  });

  const links = Object.values(data.links);

  // Mappa alla länkar i Storyblok till sitemap-format
  const urls = links
    .filter((link) => !link.is_folder) // bara faktiska sidor
    .map((link) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${link.slug}`,
      lastModified: new Date().toISOString(),
    }));

  // Lägg till startsidan
  urls.push({
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    lastModified: new Date().toISOString(),
  });

  return urls;
}
