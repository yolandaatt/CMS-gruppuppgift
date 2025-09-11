"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Sign up for our newsletter
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Be the first to know about our special offers, new product launches, and events.
          </p>
          <form className="mt-4 flex max-w-md">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-r-md hover:bg-gray-800"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/products" className="hover:text-black">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 mt-8 py-6 text-center text-xs text-gray-500">
        © 2025 Ecommerce — All rights reserved
      </div>
    </footer>
  );
}
