"use client";

import { useEffect, useState } from "react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import Link from "next/link";

export default function ProductList({ blok }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get("cdn/stories", {
        version: "published",
        starts_with: "products/",
        is_startpage: false,
      });

      const categories = data.stories.filter((story) => story.content.component === "Page");
      setProducts(categories);
    }

    fetchProducts();
  }, []);

  return (
    <section className="py-12 text-center">
      <div className="max-w-3xl mx-auto">
        {blok.title && <h2 className="text-3xl font-bold mb-8">{blok.title}</h2>}

        <div className="flex flex-wrap justify-center gap-4">
          {products.map((category) => (
            <Link
              key={category.uuid}
              href={`/${category.full_slug}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium"
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
