import { storyblokEditable, renderRichText } from "@storyblok/react";
import Link from "next/link";

export default function ImageWithText({ blok }) {

    console.log("ImageWithText blok:", blok);
  const isLeft = blok.image_side === "left";

  return (
    <section
      {...storyblokEditable(blok)}
  {...storyblokEditable(blok)}
  style={{ backgroundColor: blok.background_color?.color }}

    >
      <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {isLeft && blok.image?.filename && (
          <img
            src={blok.image.filename}
            alt={blok.alt || "Image"}
            className="w-full md:w-1/2 rounded-xl shadow"
          />
        )}

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{blok.heading}</h2>
          <div className="prose mb-4">{renderRichText(blok.content)}</div>

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
