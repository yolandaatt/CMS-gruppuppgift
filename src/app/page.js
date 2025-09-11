import { getStoryblokApi } from "@storyblok/react/rsc";
import ServerComponent from "@/components/sb/ServerComponent";
import { notFound } from "next/navigation";
import { initStoryblok } from "@/lib/storyblok";

export default async function Home() {
  initStoryblok();

  const api = getStoryblokApi();

  try {
    const { data } = await api.get("cdn/stories/home", {
      version: "draft",
    });

    const content = data?.story?.content;

    return (
      <div>
        <ServerComponent blok={content} />
      </div>
    );
  } catch (error) {
    console.error("Error loading home story:", error);
    return notFound();
  }
}

