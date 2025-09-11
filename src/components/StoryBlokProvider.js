"use client";
import { initStoryblok } from "@/lib/storyblok";

export default function StoryBlokProvider({ children }) {
  initStoryblok();
  return children;
}
