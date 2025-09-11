import { storyblokEditable, renderRichText } from "@storyblok/react";
import Link from "next/link";

export default function Hero({ blok }) {
  const align = blok.align?.toLowerCase() || "center";
  const textColor = blok.text_color?.toLowerCase() === "dark" ? "text-black" : "text-white";

  return (
    <section
      {...storyblokEditable(blok)}
      className={`h-[60vh] flex items-center justify-${align} px-8`}
      style={{
        backgroundColor: blok.background_color?.color,
        backgroundImage: blok.media?.filename
          ? `url(${blok.media.filename})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`max-w-3xl text-center ${textColor}`}>
  <h1 className="text-4xl font-bold mb-2">{blok.title}</h1>

  {blok.subtitle && (
    <div className={`text-lg mb-4 prose ${textColor === "text-white" ? "prose-invert" : ""}`}>
      {renderRichText(blok.subtitle)}
    </div>
  )}

  {blok.cta?.cached_url && blok.cta_label && (
    <Link
      href={`/${blok.cta.cached_url}`}
      className="inline-block mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
    >
      {blok.cta_label}
    </Link>
  )}
</div>
    </section>
  );
}
