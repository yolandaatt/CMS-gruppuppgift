import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  initStoryblok();

  const storyblokApi = getStoryblokApi();

  const { data: overviewData } = await storyblokApi.get("cdn/stories/products", {
    version: "published",
  });

  const pageTitle = overviewData?.story?.content?.title || "Produkter";

  const { data: productData } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "products/",
  });

  const products = (productData.stories || []).filter((product) => {
  const slug = product.slug;
  const fullSlug = product.full_slug;

  return slug !== "products" && fullSlug !== "products" && fullSlug !== "products/";
});



  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">{pageTitle}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const { title, price, image } = product.content;

          return (
            <Link
              key={product.uuid}
              href={`/products/${product.slug.replace("products/", "")}`}
              className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
            >
              {image && (
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
    </main>
  );
}
