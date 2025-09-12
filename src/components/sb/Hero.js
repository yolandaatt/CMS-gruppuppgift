"use client";

import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

export default function Hero({ blok }) {
  const bgColor = blok.background_color?.color || "transparent";
  const textColor =
    blok.text_color === "Light" ? "text-white" : "text-gray-900";
  const alignment =
    blok.align === "Left"
      ? "items-start text-left"
      : blok.align === "Right"
      ? "items-end text-right"
      : "items-center text-center";

  const hasContent = blok.subtitle?.content && blok.subtitle.content.length > 0;

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-20 px-4 md:px-8 flex justify-center`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`flex flex-col gap-4 max-w-4xl ${alignment} ${textColor}`}
      >
        {blok.title && (
          <h1 className="text-4xl font-extrabold">{blok.title}</h1>
        )}

        {hasContent && (
          <div className="prose max-w-none mb-6">
            {blok.subtitle && typeof blok.subtitle === "object"
              ? render(blok.subtitle, {
                  nodeResolvers: {
                    paragraph: (children) => <>{children}</>, 
                  },
                })
              : blok.subtitle}
          </div>
        )}

        {blok.media?.filename && (
          <img
            src={blok.media.filename}
            alt={blok.media.alt || "Hero image"}
            className="max-w-full rounded-xl shadow"
          />
        )}
      </div>
    </section>
  );
}
