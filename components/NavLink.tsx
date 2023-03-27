"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type PropTypes = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: PropTypes) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`h-full relative   w-full duration-200 ease-out 
      flex flex-col items-center justify-center ${
        href === path ? "  text-primary " : "hover:text-on-surface-variant text-zinc-500"
      }`}
    >
      {children}
      {href === path && (
        <span aria-hidden className="h-1 rounded-t-xl w-full absolute bottom-0 left-0 bg-primary"></span>
      )}
    </Link>
  );
}
