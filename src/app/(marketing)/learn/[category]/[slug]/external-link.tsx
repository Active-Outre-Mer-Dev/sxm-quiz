"use client";
import { useEffect } from "react";

export function ExternalLink() {
  useEffect(() => {
    const onExternal = (e: MouseEvent) => {
      const target = e.target;

      if (target instanceof HTMLAnchorElement && target.origin !== location.origin) {
        e.preventDefault();
        window.open(target.href);
      }
    };
    document.addEventListener("click", onExternal);
    return () => document.removeEventListener("click", onExternal);
  }, []);
  return null;
}
