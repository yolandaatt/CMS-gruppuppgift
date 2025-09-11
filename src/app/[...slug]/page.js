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

      const excluded = ["config", "home"];
      if (excluded.includes(link.slug)) return false;

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
        <main className="p-8 text-center">
          <h1>Innehåll saknas</h1>
          <p>Vi kunde inte ladda sidan.</p>
        </main>
      );
    }

    const Component = components[blok.component];
    if (!Component) {
      return (
        <main className="p-8 text-center">
          <h1>Okänd komponent</h1>
          <p>Kontakta administratören om felet kvarstår.</p>
        </main>
      );
    }

    return (
      <main {...storyblokEditable(blok)}>
        <Component blok={blok} />
      </main>
    );
  } catch (error) {
    console.error("Storyblok error:", error);
    return (
      <main className="p-8 text-center">
        <h1>Kunde inte ladda sidan</h1>
        <p>Försök igen senare.</p>
      </main>
    );
  }
}
