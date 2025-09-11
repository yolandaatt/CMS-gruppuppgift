import { getStoryblokApi } from "@storyblok/react/rsc";
import { components, initStoryblok } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";

initStoryblok();

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/links/", {
    version: "published",
  });

  const links = Object.values(data.links);

  return links
    .filter((link) => {
      if (link.is_folder) return false;
      if (!link.slug) return false;

      const excluded = ["config", "home", "not-found", "_not-found"];
      if (excluded.includes(link.slug)) return false;
      if (link.slug.includes("not-found")) return false;

      return true;
    })
    .map((link) => ({
      slug: link.slug.split("/"),
    }));
}

export default async function Page({ params: { slug }, searchParams }) {
  try {
    const realSlug = slug?.join("/") || "home";

    const isPreview =
      process.env.NODE_ENV === "development" ||
      searchParams?.storyblok === "1" ||
      searchParams?.storyblok_preview === "1";

    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${realSlug}`, {
      version: isPreview ? "draft" : "published",
    });

    const blok = data?.story?.content;
    if (!blok) {
      return (
        <main>
          <h1>Sidan hittades inte</h1>
        </main>
      );
    }

    const Component = components[blok.component];
    if (!Component) {
      return (
        <main>
          <h1>Okänt komponenttyp</h1>
        </main>
      );
    }

    console.log("→ Blok content:", blok);
    console.log("→ component:", blok.component);

    return (
      <main {...storyblokEditable(blok)}>
        <Component blok={blok} />
      </main>
    );
  } catch (error) {
    console.error("Storyblok error:", error);
    return (
      <main>
        <h1>Kunde inte ladda sidan</h1>
        <p>Försök igen senare.</p>
      </main>
    );
  }
}
