"use client";

import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";

export default function AboutText({ blok }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-gray-200 p-6 rounded-xl mb-16 text-center"
    >
      {blok.title && (
        <h2 className="text-2xl font-bold mb-4">{blok.title}</h2>
      )}

      {blok.text && (
        <div
          className="prose text-gray-700 mx-auto"
          dangerouslySetInnerHTML={{ __html: renderRichText(blok.text) }}
        />
      )}
    </section>
  );
}
