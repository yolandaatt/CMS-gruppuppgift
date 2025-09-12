"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { render } from "storyblok-rich-text-react-renderer";

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
        <div className="prose max-w-none mb-6">
          {render(blok.text, {
            nodeResolvers: {
              paragraph: (children) => <>{children}</>,
            },
          })}
        </div>
      )}
    </section>
  );
}
