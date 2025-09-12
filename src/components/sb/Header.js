"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = query.trim();


    if (trimmed === "") {
      router.push("/products");
    } else {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header>
      {/* Main nav */}
      <div className="w-full bg-[#EFF2F6] border-b border-black/50">
        <div className="mx-auto max-w-[1400px] h-[60px] flex items-center justify-between px-6">
          {/* Vänster: brand */}
          <div className="text-[15px] font-semibold tracking-[-0.03em]">
            QNW
          </div>

          {/* Mitten: navigation */}
          <nav>
            <ul className="flex items-center gap-8 text-[15px] font-medium tracking-[-0.03em] text-gray-900">
              <li>
                <Link href="/" className="hover:opacity-70">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:opacity-70">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-70">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Höger: search + cart */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <label className="relative inline-flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-[36px] w-[343px] rounded-md border border-gray-300 bg-white px-3 pr-9 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                  />
                </svg>
              </button>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}

