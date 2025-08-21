
import { storyblokEditable } from "@storyblok/react";

export default function Hero({ blok }) {
    console.log("HERO", blok)

    let heroClasses = `h-[50vh] bg-amber-400/25`

    console.log(blok.background_image?.filename)

    return (
        <div {...storyblokEditable(blok)} className={heroClasses} style={{
            backgroundImage: `url(${blok?.background_image?.filename})`
        }}>
            <h1>
            {blok.title}
            </h1>
            <h4>
                {blok.description}
            </h4>
        </div>
    )
}