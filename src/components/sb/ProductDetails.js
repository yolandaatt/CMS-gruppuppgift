"use client";

import Image from "next/image";
import Link from "next/link";
import { renderRichText } from "@storyblok/react";

export default function ProductDetails({ blok }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8">

      {blok.image?.filename ? (
        <div className="flex-shrink-0 w-full md:w-1/2">
          <Image
            src={blok.image.filename}
            alt={blok.title || "Produktbild"}
            width={600}
            height={600}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full md:w-1/2 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-gray-400">Ingen bild</span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{blok.title}</h1>
        <p className="text-2xl text-green-600 font-semibold mb-6">
          {blok.price} kr
        </p>


        {blok.description && (
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{
              __html: renderRichText(blok.description),
            }}
          />
        )}

        <div className="flex flex-col gap-3 mt-auto">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Lägg i kundvagn
          </button>

          <Link
            href="/products"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-center hover:bg-gray-300 transition"
          >
            ← Tillbaka till produkter
          </Link>
        </div>
      </div>
    </div>
  );
}
