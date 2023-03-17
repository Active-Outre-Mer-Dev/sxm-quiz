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
      className={`h-full font-semibold text-lg  w-full duration-200 ease-out 
      flex items-center justify-center ${
        href === path
          ? "bg-secondary-container text-on-secondary-container"
          : "text-on-surface hover:bg-secondary-container/50"
      }`}
    >
      {children}
    </Link>
  );
}
