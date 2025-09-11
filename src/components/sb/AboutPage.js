import { getStoryblokApi, StoryblokComponent } from "@storyblok/react/rsc";

export const revalidate = 60;

export default async function AboutPage() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/about", {
    version: "published",
  });

  const blok = data?.story?.content;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">
          {blok?.title || "Om oss"}
        </h1>
      </section>

      {blok?.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
