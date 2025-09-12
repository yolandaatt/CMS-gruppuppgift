import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage({ searchParams }) {
  initStoryblok();
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "products/",
    is_startpage: false,
  });

  const products = data.stories.filter(
    (story) => story.content.component === "ProductPage"
  );

  const search = searchParams?.search?.toLowerCase() || "";
  const filteredProducts = products.filter((story) => {
    const title = story.content.title?.toLowerCase() || "";
    return title.includes(search);
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Alla våra produkter</h1>

      {/* Länkar till kategorier */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Våra kategorier</h2>
        <div className="flex gap-4 justify-center">
          <Link href="/tag/tshirt" className="bg-blue-600 text-white px-4 py-2 rounded">
            T-shirts
          </Link>
          <Link href="/tag/keps" className="bg-blue-600 text-white px-4 py-2 rounded">
            Kepsar
          </Link>
        </div>
      </div>

      {/* Lista med produkter */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Inga produkter hittades</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const { title, price, image } = product.content;

            return (
              <Link
                key={product.uuid}
                href={`/products/${product.slug}`}
                className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
              >
                {image?.filename && (
                  <Image
                    src={image.filename}
                    alt={image.alt || title}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{title}</h2>
                  <p className="text-gray-600 mb-4">{price} kr</p>
                  <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    Visa produkt
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

