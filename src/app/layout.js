import "./globals.css";

import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import ServerComponent from "@/components/sb/ServerComponent";
import StoryBlokProvider from "@/components/StoryBlokProvider";
import Footer from "@/components/sb/Footer";


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
  }

  return (
    <StoryBlokProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          {/* HEADER */}
          <header className="border-b bg-white">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
              <div className="font-bold text-lg">Ecommerce</div>
              <div className="flex gap-6">
                {navigation.map((item) => (
                  <ServerComponent blok={item} key={item._uid} />
                ))}
              </div>
            </nav>
          </header>

          {/* MAIN */}
          <main className="flex-1 container mx-auto px-6 py-10">
            {children}
          </main>
           <Footer />
        </body>
      </html>
    </StoryBlokProvider>
  );
}
