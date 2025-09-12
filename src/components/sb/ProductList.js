"use client";

import { useEffect, useState } from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ blok }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get("cdn/stories", {
          version: "published",
          starts_with: "products/",
        });

        console.log("Fetched stories:", data.stories.map((s) => ({
          name: s.name,
          slug: s.full_slug,
          component: s.content.component,
          tags: s.tag_list,
        })));

        const allProducts = data.stories.filter(
          (story) => story.content.component === "ProductPage"
        );

        const filtered = blok.filterTag
          ? allProducts.filter((product) =>
              product.tag_list.includes(blok.filterTag)
            )
          : allProducts;

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, [blok.filterTag]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {blok.title && (
          <h2 className="text-3xl font-bold mb-8 text-center">{blok.title}</h2>
        )}

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Inga produkter hittades</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const { title, price, image } = product.content;

              return (
                <Link
                  key={product.uuid}
                  href={`/${product.full_slug}`}
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
                    {price && <p className="text-gray-600 mb-4">{price} kr</p>}
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      Visa produkt
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
