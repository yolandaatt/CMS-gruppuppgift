import React from "react";
import DoesNotExist from "./DoesNotExist";
import { components } from "@/lib/storyblok";


export default function ServerComponent({ blok }) {
try {
const Component = components[blok.component];


if (!Component) {
console.warn("⚠️ Okänd komponent:", blok.component);
return <DoesNotExist blok={blok} />;
}


return <Component blok={blok} />;
} catch (err) {
console.error("💥 Fel vid rendering av komponent:", blok.component, err);
return (
<div className="text-red-600 p-4">
Fel vid rendering av <code>{blok.component}</code>
</div>
);
}
}