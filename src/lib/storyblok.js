import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@storyblok/react";
import Page from "@/components/sb/Page";

import Hero from "@/components/sb/Hero";
import NavItem from "@/components/sb/NavItem";
import ImageBanner from "@/components/sb/ImageBanner";
import ImageWithText from "@/components/sb/ImageWithText";
import LatestProductsList from "@/components/sb/LatestProductsList";
import ProductDetails from "@/components/sb/ProductDetails";
import AboutText from "@/components/sb/AboutText";

import DoesNotExist from "@/components/sb/DoesNotExist";

export const components = {
  Page: Page,
  page: Page,
  ProductPage: ProductDetails,
  Layout: Page,

  hero: Hero,
  image_banner: ImageBanner,
  navItem: NavItem,
  image_with_text: ImageWithText,
  latest_products_list: LatestProductsList,
  product_details: ProductDetails,
  about_text: AboutText,
};

let inited = false;
export function initStoryblok() {
  if (inited) return;
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
    use: [apiPlugin],
    apiOptions: { region: "eu" },
    components,
  });
  inited = true;
}

export { getStoryblokApi }; 
