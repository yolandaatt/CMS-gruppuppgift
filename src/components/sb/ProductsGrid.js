"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsGrid({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">Inga produkter hittades.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
      {products.map((product) => {
        const { title, price, image } = product.content;

        return (
          <Link
            key={product.uuid}
            href={`/${product.full_slug}`}
            className="group border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            {/* Bild */}
            {image?.filename ? (
              <div className="relative w-full h-56">
                <Image
                  src={image.filename}
                  alt={title || "Produktbild"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                Ingen bild
              </div>
            )}

            {/* Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{title}</h2>
              {price && <p className="text-gray-700 font-medium">{price} kr</p>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
