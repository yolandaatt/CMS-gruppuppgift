"use client";

import Link from "next/link";

export default function CategoryLinks() {
  const categories = [
    { name: "T-shirts", tag: "tshirt" },
    { name: "Kepsar", tag: "keps" },
  ];

  return (
    <section className="text-center py-8">
      <div className="flex justify-center gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.tag}
            href={`/products/${cat.tag}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
