"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center border rounded px-3 py-2">
      <input
        type="text"
        placeholder="Sök produkter..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none w-full"
      />
      <button onClick={handleSearch} aria-label="Sök">
        <Search className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
      </button>
    </div>
  );
}
