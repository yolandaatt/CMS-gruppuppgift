import { getStoryblokApi } from "@storyblok/react/rsc";
import ServerComponent from "@/components/sb/ServerComponent";
import { initStoryblok } from "@/lib/storyblok";

export default async function Home() {
  initStoryblok();

  const api = getStoryblokApi();

  try {
    const { data } = await api.get("cdn/stories/home", {
      version: "draft",
    });

    const content = data?.story?.content;

    if (!content) {
      return (
        <div>
          <h1>Innehåll saknas</h1>
          <p>Vi kunde inte ladda startsidan just nu.</p>
        </div>
      );
    }

    return (
      <div>
        <ServerComponent blok={content} />
      </div>
    );
  } catch (error) {
    console.error("Error loading home story:", error);
    return (
      <div>
        <h1>Kunde inte ladda startsidan</h1>
        <p>Försök igen senare.</p>
      </div>
    );
  }
}
