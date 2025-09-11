"use client";

import { storyblokEditable, renderRichText } from "@storyblok/react";
import Link from "next/link";

export default function ImageWithText({ blok }) {
  const isLeft = blok.image_side === "left";
  const bgColor = blok.background_color?.color || "transparent";

  const hasContent =
    blok.content?.content && blok.content.content.length > 0;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ backgroundColor: bgColor }}
      className="py-12 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {isLeft && blok.image?.filename && (
          <img
            src={blok.image.filename}
            alt={blok.alt || "Image"}
            className="w-full md:w-1/2 rounded-xl shadow"
          />
        )}

        <div className="w-full md:w-1/2 text-center md:text-left">
          {blok.heading && (
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {blok.heading}
            </h2>
          )}

          {hasContent && (
            <div
              className="prose mb-4"
              dangerouslySetInnerHTML={{ __html: renderRichText(blok.content) }}
            />
          )}

          {blok.cta?.url && blok.cta_label && (
            <Link
              href={blok.cta.url}
              className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {blok.cta_label}
            </Link>
          )}
        </div>

        {!isLeft && blok.image?.filename && (
          <img
            src={blok.image.filename}
            alt={blok.alt || "Image"}
            className="w-full md:w-1/2 rounded-xl shadow"
          />
        )}
      </div>
    </section>
  );
}
