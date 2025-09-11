// src/components/sb/ProductsGrid.js
import Link from "next/link";

export default function ProductsGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((story) => (
        <div key={story.uuid} className="border rounded-lg p-4 shadow">
          {story.content?.image?.filename && (
            <img
              src={story.content.image.filename}
              alt={story.content.image.alt || story.name}
              className="mb-4 rounded"
            />
          )}
          <h3 className="text-xl font-semibold">{story.content.title}</h3>
          {story.content.price && (
            <p className="text-sm text-gray-600 mb-2">
              {story.content.price} kr
            </p>
          )}
          <Link
            href={`/${story.full_slug}`}
            className="text-blue-500 hover:underline"
          >
            Läs mer →
          </Link>
        </div>
      ))}
    </div>
  );
}
