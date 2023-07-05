"use client";

import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Link } from "lucide-react";

export function ShareMedia() {
  return (
    <div className="flex gap-2">
      <button
        aria-label="Copy link"
        className="h-8 w-8 bg-white hover:bg-neutral-50 rounded-md flex items-center justify-center ring-1 ring-neutral-200"
      >
        <Link size={"65%"} className="stroke-gray-600" />
      </button>
      <button
        aria-label="Share on twitter"
        className="h-8 w-8 hover:bg-neutral-50 bg-white rounded-md flex items-center justify-center ring-1 ring-neutral-200"
      >
        <Twitter size={"65%"} className="stroke-gray-600" />
      </button>
      <button
        aria-label="Share on facebook"
        className="h-8 w-8 bg-white hover:bg-neutral-50 rounded-md flex items-center justify-center ring-1 ring-neutral-200"
      >
        <Facebook size={"65%"} className="stroke-gray-600" />
      </button>
    </div>
  );
}
