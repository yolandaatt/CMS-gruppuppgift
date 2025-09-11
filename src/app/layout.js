// app/layout.js
import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import ServerComponent from "@/components/sb/ServerComponent";
import StoryBlokProvider from "@/components/StoryBlokProvider";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children }) {
  initStoryblok();

  let config = null;
  let navigation = [];
  let footerLinks = [];

  try {
    const api = getStoryblokApi();
    const { data } = await api.get("cdn/stories/config", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      resolve_links: "url",
    });
    config = data?.story?.content ?? null;
    navigation = config?.navigation ?? [];
    footerLinks = config?.footer_links ?? [];
  } catch (e) {
    console.warn("⚠️ Kunde inte ladda config:", e?.message);
    // inga throw, inga notFound() här!
  }

  return (
    <StoryBlokProvider>
      <html lang="en">
        <body>
          <header className="border-b p-4">
            <nav className="container mx-auto flex gap-6">
              {navigation.map((item) => (
                <ServerComponent blok={item} key={item._uid} />
              ))}
            </nav>
          </header>

          <main>{children}</main>

          <footer className="border-t p-6 text-sm">
            <div className="container mx-auto flex gap-4 flex-wrap">
              {footerLinks.map((item) => (
                <ServerComponent blok={item} key={item._uid} />
              ))}
            </div>
          </footer>
        </body>
      </html>
    </StoryBlokProvider>
  );
}
