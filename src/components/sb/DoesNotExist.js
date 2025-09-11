export default function DoesNotExist({ blok }) {
return (
<div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
<p className="text-yellow-700">
⚠️ Komponenten <strong>{blok?.component}</strong> kunde inte renderas.
</p>
</div>
);
}