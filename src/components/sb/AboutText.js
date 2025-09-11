import { storyblokEditable, renderRichText } from "@storyblok/react";

export default function AboutText({blok}) {
    return (
        <section {...storyblokEditable(blok)}
        className="px-6 py-12 max-w-3xl mx-auto"> 
        <h1 className="text-4xl font-bold mb-6">{blok.title}</h1>
        <div className="prose">{renderRichText(blok.text)}</div>
        </section>
    )
}