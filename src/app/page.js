import { getStoryblokApi } from "@storyblok/react/rsc";
import { components, initStoryblok } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";


export default async function Home() {
  initStoryblok();

  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories/home", {
    version: "draft",
  });

  const blok = data?.story?.content;

  if (!blok) {
    return (
      <div>
        <h1>Innehåll saknas</h1>
        <p>Vi kunde inte ladda startsidan just nu.</p>
      </div>
    );
  }

  const Component = components[blok.component];

  if (!Component) {
    return (
      <div>
        <h1>Okänd komponent: {blok.component}</h1>
      </div>
    );
  }

  return (
    <main {...storyblokEditable(blok)}>
      <Component blok={blok} />
    </main>
  );
}
