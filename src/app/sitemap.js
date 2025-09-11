import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";

initStoryblok();

export default async function sitemap() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/links", {
    version: "published",
  });

  const links = Object.values(data.links);

  const urls = links
    .filter((link) => !link.is_folder)
    .map((link) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${link.slug}`,
      lastModified: new Date().toISOString(),
    }));
    
  urls.push({
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    lastModified: new Date().toISOString(),
  });

  return urls;
}
