import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import ProductsGrid from "@/components/sb/ProductsGrid";

export default async function ProductsPage() {
  initStoryblok();
  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories", {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    starts_with: "products/",
  });

  const allProducts = data.stories || [];
  const filteredProducts = allProducts.filter(
    (product) => product.content?.component === "ProductPage"
  );

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alla produkter</h1>
      <ProductsGrid products={filteredProducts} />
    </section>
  );
}
