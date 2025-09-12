"use client";

import { useEffect, useState } from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import Link from "next/link";

export default function LatestProductsList({ blok }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get("cdn/stories", {
          starts_with: "products/",
          version: "draft", 
          sort_by: "first_published_at:desc",
          per_page: 100,
        });

        const validProducts = (data?.stories || [])
          .filter((story) => {
            const content = story.content;
            return (
              content?.title &&
              content?.image?.filename &&
              story.slug !== "products"
            );
          })
          .slice(0, blok?.limit || 3);

        setProducts(validProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
      }
    }

    fetchProducts();
  }, [blok?.limit]);

  if (error) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">
          {blok?.title || "Produkter"}
        </h2>
        <p className="text-red-500">Kunde inte ladda produkter.</p>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold mb-6">
          {blok?.title || "Produkter"}
        </h2>
        <p>Inga produkter tillgängliga just nu.</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-6">{blok?.title || "Produkter"}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((story) => (
          <li key={story.uuid} className="border rounded-lg p-4 shadow">
            {story.content?.image?.filename && (
              <img
                src={story.content.image.filename}
                alt={story.content.image.alt || story.name}
                className="mb-4 rounded"
              />
            )}
            <h3 className="text-xl font-semibold">
              {story.content?.title || story.name}
            </h3>
            {story.content?.price && (
              <p className="text-sm text-gray-600 mb-2">
                {story.content.price} kr
              </p>
            )}
            <Link
              href={`/${story.full_slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Läs mer →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}