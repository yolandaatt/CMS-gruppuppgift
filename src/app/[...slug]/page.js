import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok, components } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";
import ProductDetails from "@/components/sb/ProductDetails";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  initStoryblok();

  const slug = params?.slug?.join("/") || "home";
  const storyblokApi = getStoryblokApi();
  let data;

  try {
    const res = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "published",
    });
    data = res.data;
  } catch (err) {
    console.error("💥 Storyblok error:", err);
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

  // Om det är en produkt-sida → använd ProductDetails
  if (blok.component === "ProductPage") {
    return (
      <main {...storyblokEditable(blok)} className="max-w-4xl mx-auto p-6">
        <ProductDetails blok={blok} />
      </main>
    );
  }

  // Annars: dynamiska komponenter
  const Component = components[blok.component] || (() => <p>Unknown component</p>);

  return (
    <main {...storyblokEditable(blok)} className="max-w-4xl mx-auto p-6">
      <Component blok={blok} />
    </main>
  );
}

