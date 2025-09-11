import { getStoryblokApi } from "@storyblok/react/rsc";
import LatestProductsList from "@/components/sb/LatestProductsList";

export default async function ProductsPage() {
  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories", {
    version: "draft",
    starts_with: "products/",
  });

  const allProducts = data.stories || [];

  const filteredProducts = allProducts.filter(
    (product) => product.content?.component === "ProductPage"
  );

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Alla produkter</h1>
      <LatestProductsList blok={{ products: filteredProducts }} />
    </section>
  );
}
