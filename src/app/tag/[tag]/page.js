import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";

export default async function TagPage({ params }) {
  initStoryblok();
  const storyblokApi = getStoryblokApi();

  const tag = params.tag;

  try {
    const { data } = await storyblokApi.get("cdn/stories", {
      version: "published",
      starts_with: "products/",
      is_startpage: false,
      filter_query: {
        "tags": {
          any_in_array: tag,
        },
      },
    });

    const products = data.stories;

    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Produkter i kategorin: <span className="capitalize">{tag}</span>
        </h1>

        <Link
          href="/products"
          className="inline-block mb-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Tillbaka till alla produkter
        </Link>

        {products.length === 0 ? (
          <p className="text-gray-500">Inga produkter hittades för denna kategori</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const { title, price, image } = product.content;
              return (
                <Link
                  key={product.uuid}
                  href={`/products/${product.slug}`}
                  className="border rounded-lg p-4 hover:shadow-lg transition"
                >
                  {image?.filename && (
                    <Image
                      src={image.filename}
                      alt={image.alt || title}
                      width={400}
                      height={300}
                      className="rounded mb-4 object-cover w-full h-48"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2">{title}</h2>
                  <p className="text-gray-700">{price} kr</p>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error("Tag Page Error:", error);
    return (
      <main className="p-12 text-center">
        <h1 className="text-2xl font-bold">404 – Innehållet hittades inte</h1>
        <p>{`/tag/${tag}`}</p>
      </main>
    );
  }
}
