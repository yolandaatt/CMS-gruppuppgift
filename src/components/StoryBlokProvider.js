"use client";

import { getStoryblokApi } from "@/lib/storyblok";

/**
 * StoryblokProvider is a component that provides the Storyblok API to the application
 * @param {Object} props - The props for the StoryblokProvider component
 * @param {React.ReactNode} props.children - The children of the StoryblokProvider component
 * @returns {React.ReactNode}
 */
export default function StoryblokProvider({ children }) {
	getStoryblokApi();
	return children;
}