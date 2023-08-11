"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";

export function NavLink(props: LinkProps & { children?: React.ReactNode }) {
  const path = usePathname();
  return (
    <li
      data-active={path === props.href}
      className={`group w-full relative border-l-2 hover:bg-neutral-200/30 hover:dark:bg-neutral-600/30
      data-[active=true]:bg-primary-200/10 rounded-r data-[active=true]:dark:bg-primary-600/10
    border-neutral-100 dark:border-neutral-700 data-[active=true]:border-primary-500 data-[active-true]:border-primary-200 -ml-[2px] pl-[2px]`}
    >
      <Link
        {...props}
        className={`w-full p-1 block 
          group-data-[active=true]:font-medium
        group-data-[active='true']:text-primary-600 group-data-[active=true]:dark:text-primary-200 duration-200 ease-out
      `}
      />
    </li>
  );
}
