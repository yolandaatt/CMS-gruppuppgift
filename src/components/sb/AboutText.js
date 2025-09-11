import { getStoryblokApi } from "@storyblok/react/rsc";
import Image from "next/image";

export const revalidate = 60;

export default async function AboutPage() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/about", {
    version: "published",
  });

  const blok = data?.story?.content;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* About section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{blok.title || "About us"}</h1>
        <div className="prose mx-auto text-gray-600">
          {blok.description}
        </div>
      </section>

      {/* Gray banner */}
      <section className="bg-gray-200 h-40 rounded-xl mb-16 flex items-center justify-center">
        <span className="text-gray-500">[Bild / banner här]</span>
      </section>

     
    </main>
  );
}
