import Link from "next/link";
import { cn } from "../utils/cn";

export default function NotFound() {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4",
        "bg-gradient-to-br from-slate-50 to-slate-100"
      )}
    >
      <div
        className={cn(
          "text-center space-y-8 max-w-md mx-auto",
          "animate-fade-in"
        )}
      >
        {/* 404 Number */}
        <div
          className={cn(
            "text-8xl font-bold text-transparent bg-clip-text",
            "bg-gradient-to-r from-blue-600 to-purple-600",
            "drop-shadow-sm"
          )}
        >
          404
        </div>

        {/* Main heading */}
        <h1
          className={cn("text-3xl font-bold text-slate-800", "leading-tight")}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          className={cn(
            "text-slate-600 text-lg leading-relaxed",
            "max-w-sm mx-auto"
          )}
        >
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>

        {/* Action buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center",
            "pt-4"
          )}
        >
          <Link
            href="/"
            className={cn(
              "inline-flex items-center justify-center px-8 py-4",
              "bg-blue-600 hover:bg-blue-700 text-white font-medium",
              "rounded-lg shadow-md hover:shadow-lg",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "text-lg"
            )}
          >
            Return Home
          </Link>
        </div>

        {/* Decorative element */}
        <div className={cn("flex justify-center pt-8 opacity-60")}>
          <div
            className={cn(
              "w-16 h-16 border-4 border-slate-300 rounded-full",
              "border-t-blue-500 animate-spin"
            )}
          />
        </div>
      </div>
    </div>
  );
}
