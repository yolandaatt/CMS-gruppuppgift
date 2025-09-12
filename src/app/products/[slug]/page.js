import { getStoryblokApi, renderRichText } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import Image from "next/image";

export default async function ProductPage({ params }) {
  initStoryblok();
  const storyblokApi = getStoryblokApi();

  const slug = params?.slug;

  try {
    const { data } = await storyblokApi.get(`cdn/stories/products/${slug}`, {
      version: "published",
    });

    const product = data.story.content;
    const { title, price, description, image } = product;

    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {image?.filename && (
          <Image
            src={image.filename}
            alt={image.alt || title}
            width={600}
            height={400}
            className="rounded-lg mb-6"
          />
        )}
        <div className="prose prose-sm text-gray-700 mb-6 max-w-none">
          {renderRichText(description)}
        </div>
        <p className="text-xl font-semibold mb-6">{price} kr</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Lägg i varukorg
        </button>

        <div className="mt-6">
  <a
    href="/products"
    className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
  >
    ← Tillbaka till alla produkter
  </a>
</div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <main className="p-12 text-center">
        <h1 className="text-2xl font-bold">404 – Produkten hittades inte</h1>
      </main>
    );
  }
}
