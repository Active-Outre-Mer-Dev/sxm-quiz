"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";

export function NavLink(props: LinkProps & { children?: React.ReactNode }) {
  const path = usePathname();
  return (
    <li
      data-active={path === props.href}
      className={`group w-full relative border-l-2 hover:bg-neutral-200/30 
      data-[active=true]:bg-primary-200/10 rounded-r
    border-neutral-100 data-[active=true]:border-primary-500 -ml-[2px] pl-[2px]`}
    >
      <Link
        {...props}
        className={`w-full p-1 block 
        text-neutral-700  group-data-[active=true]:font-medium
        group-data-[active='true']:text-primary-600 duration-200 ease-out
      `}
      />
    </li>
  );
}
