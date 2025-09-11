"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      {/* Topbar */}
      <div className="w-full bg-black text-white text-[15px] font-medium tracking-[-0.03em]">
        <div className="mx-auto max-w-[1400px] h-[45px] flex items-center justify-between px-6">
          {/* Vänster */}
          <span>SWE</span>

          {/* Mitten */}
          <span>Välkommen till Quitters Never Win</span>

          {/* Höger */}
          <span>QNW</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-full bg-[#EFF2F6] border-b border-black/50">
        <div className="mx-auto max-w-[1400px] h-[60px] flex items-center justify-between px-6">
          {/* Vänster: brand */}
          <div className="text-[15px] font-semibold tracking-[-0.03em]">
            Quitters never win - QNW
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
                className="h-[36px] w-[343px] rounded-md border border-gray-300 bg-white px-3 pr-9 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
              />
              <svg
                width="16"
                height="16"
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
            </label>

            {/* Cart */}
            <button
              aria-label="Cart"
              className="relative inline-flex items-center"
            >
              <svg
                width="20"
                height="20"
                aria-hidden="true"
                className="text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.6 3M7 13h10l3-8H6.2M7 13 6 18h12M7 21h.01M17 21h.01"
                />
              </svg>
              <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] text-white">
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

