"use client";


import { storyblokEditable, renderRichText } from "@storyblok/react";


export default function Hero({ blok }) {
return (
<section className="bg-[#EFF2F6]" {...storyblokEditable(blok)}>
<div className="mx-auto max-w-[1400px] flex flex-col items-center text-center py-16">


{/* Titel */}
{blok.title && (
<h1 className="text-[56px] font-semibold leading-[62px] text-black">
{blok.title}
</h1>
)}


{/* Subtitle */}
{blok.subtitle && (
<div className="mt-4 max-w-[610px] text-[20px] leading-[28px] text-[#979797]">
{renderRichText(blok.subtitle)}
</div>
)}


{/* Knapp */}
{blok.button_text && (
<a
href={blok.button_link?.url || "#"}
className="mt-8 h-[50px] w-[194px] border border-black text-black font-medium text-[15px] flex items-center justify-center hover:bg-black hover:text-white"
>
{blok.button_text}
</a>
)}


{/* Bild */}
{blok.image?.filename ? (
<img
src={blok.image.filename}
alt={blok.image.alt || "Hero image"}
className="mt-10 w-[1114px] h-[521px] object-cover"
/>
) : (
<div className="mt-10 w-[1114px] h-[521px] bg-gray-300" />
)}
</div>
</section>
);
}