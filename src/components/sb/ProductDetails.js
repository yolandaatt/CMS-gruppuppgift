import { storyblokEditable, renderRichText } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="py-12 px-4 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {blok.image?.filename && (
          <Image
            src={blok.image.filename}
            alt={blok.alt || blok.title || "Produktbild"}
            width={600}
            height={400}
            className="rounded shadow"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-4">{blok.title}</h1>
          <p className="text-xl text-blue-600 mb-4">{blok.price} kr</p>

          <div className="prose mb-4">
            {blok.description && renderRichText(blok.description)}
          </div>

          <Link href="/products" className="text-blue-500 hover:underline">
            Tillbaka till produkter
          </Link>
        </div>
      </div>
    </section>
  );
}
