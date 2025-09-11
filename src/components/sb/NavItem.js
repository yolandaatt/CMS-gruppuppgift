"use client";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function NavItem({ blok }) {
  const label = blok?.label || blok?.name || "Link";
  const link = blok?.link;

  // Storybloks Multilink kan vara intern (story) eller extern url
  const href =
    (link?.cached_url && `/${link.cached_url}`) ||
    link?.url ||
    "/";

  const isExternal = link?.linktype === "url" && /^https?:\/\//.test(href);

  return isExternal ? (
    <a {...storyblokEditable(blok)} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  ) : (
    <Link {...storyblokEditable(blok)} href={href.startsWith("/") ? href : `/${href}`}>
      {label}
    </Link>
  );
}
