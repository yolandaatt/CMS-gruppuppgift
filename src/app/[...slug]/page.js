import { getStoryblokApi } from "@storyblok/react/rsc";
import { components, initStoryblok } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";

initStoryblok();

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export default async function SafePage({ params: { slug }, searchParams }) {
  try {
    const realSlug = slug?.join("/") || "home";
    console.log("👉 Laddar slug:", realSlug);

    const isPreview =
      process.env.NODE_ENV === "development" ||
      searchParams?.storyblok === "1" ||
      searchParams?.storyblok_preview === "1";

    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${realSlug}`, {
      version: isPreview ? "draft" : "published",
    });

    console.log("📦 Storyblok-data:", data?.story?.name || "ingen story");

    const blok = data?.story?.content;
    if (!blok) {
      console.warn("⚠️ Ingen content hittades för slug:", realSlug);
      return (
        <main className="p-8 text-center">
          <h1>Innehåll saknas</h1>
        </main>
      );
    }

    const Component = components[blok.component];
    if (!Component) {
      console.warn("⚠️ Okänd komponent:", blok.component);
      return (
        <main className="p-8 text-center">
          <h1>Okänd komponent: {blok.component}</h1>
        </main>
      );
    }

    return (
      <main {...storyblokEditable(blok)}>
        <Component blok={blok} />
      </main>
    );
  } catch (error) {
    console.error("💥 Storyblok error:", error);
    return (
      <main className="p-8 text-center">
        <h1>Kunde inte ladda sidan</h1>
        <p>{error.message}</p>
      </main>
    );
  }
}
