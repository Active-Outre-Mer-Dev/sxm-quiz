"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";
import { motion } from "framer-motion";

export function NavItem(props: LinkProps & { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <li
      data-active={path === props.href}
      className={`text-lg flex items-center relative  py-4 data-[active=true]:font-medium`}
    >
      <Link {...props}>{props.children}</Link>
      {path === props.href && (
        <motion.span
          layout
          layoutId="activeBorder"
          className="bg-primary-500 absolute rounded-t-lg block h-[3px] w-full bottom-0 left-0"
        />
      )}
    </li>
  );
}
