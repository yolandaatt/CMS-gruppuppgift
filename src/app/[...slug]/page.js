import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import ProductDetails from "@/components/sb/ProductDetails";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  initStoryblok();

  const slug =
    Array.isArray(params?.slug) && params.slug.length > 0
      ? params.slug.join("/")
      : "home";

  const storyblokApi = getStoryblokApi();
  let data;

  try {
    const res = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "published",
    });

    data = res.data;
  } catch (err) {
    console.error("Storyblok error:", err.response?.data || err);
    return (
      <main className="p-12 text-center">
        <h1 className="text-2xl font-bold">404 – Innehållet hittades inte</h1>
        <p>{slug}</p>
      </main>
    );
  }

  const blok = data?.story?.content;

  if (!blok) {
    return (
      <main className="p-12 text-center">
        <h1>Ingen content hittades</h1>
      </main>
    );
  }

  if (blok.component === "ProductPage") {
    return (
      <main {...storyblokEditable(blok)} className="max-w-4xl mx-auto p-6">
        <ProductDetails blok={blok} />
      </main>
    );
  }

  return (
    <main {...storyblokEditable(blok)} className="max-w-7xl mx-auto p-6">
      <StoryblokComponent blok={blok} />
    </main>
  );
}

