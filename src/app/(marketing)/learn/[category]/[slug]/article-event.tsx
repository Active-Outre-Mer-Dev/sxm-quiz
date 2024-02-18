"use client";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

export function ArticleEvent() {
  const { category, slug } = useParams();
  const path = usePathname();

  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Article Opened",
        properties: { Category: category, Slug: slug, Path: path, Type: "article" }
      })
    });
  }, [category, slug, path]);
  return null;
}
