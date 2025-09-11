import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function ImageBanner({ blok }) {
  const aspectMap = {
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
    "auto": "",
    "square": "aspect-square",
    "landscape": "aspect-[4/3]",
    "portrait": "aspect-[3/4]",
  };

  const aspectClass = aspectMap[blok.aspect?.toLowerCase()] || "";

  const hasLink = blok.link?.cached_url && blok.cta_label;

  const bannerContent = (
    <div
      {...storyblokEditable(blok)}
      className={`relative w-full ${aspectClass} bg-cover bg-center`}
      style={{ backgroundColor: blok.background_color?.color }}
    >
      {blok.image?.filename && (
        <img
          src={blok.image.filename}
          alt={blok.alt || "Image"}
          className="w-full h-full object-cover"
        />
      )}

      {hasLink && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-6 py-3 bg-white/80 text-black rounded font-semibold">
            {blok.cta_label}
          </span>
        </div>
      )}
    </div>
  );

  return hasLink ? (
    <Link href={`/${blok.link.cached_url}`}>
      {bannerContent}
    </Link>
  ) : (
    bannerContent
  );
}
