import './globals.css';


import { getStoryblokApi } from "@storyblok/react/rsc";
import { initStoryblok } from "@/lib/storyblok";
import ServerComponent from "@/components/sb/ServerComponent";
import StoryBlokProvider from "@/components/StoryBlokProvider";
import Footer from "@/components/sb/Footer";
import Header from "@/components/sb/Header";


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
      <head /> 
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
        <Header navigation={navigation} />

        {/* MAIN */}
        <main className="flex-1 container mx-auto px-6 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  </StoryBlokProvider>
)
}