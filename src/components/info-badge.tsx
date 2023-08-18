import { ChevronRight } from "lucide-react";
import Link from "next/link";

type PropTypes = {
  info: string;
  href: string;
  link: string;
};

export function InfoBadge({ href, info, link }: PropTypes) {
  return (
    <Link
      href={href}
      className={`relative group duration-150 ease-out bg-white rounded-full   px-3 py-1 text-sm leading-6 
     text-gray- dark:text-gray-300 ring-1 ring-neutral-900/10 dark:ring-neutral-200/20 hover:ring-primary-500/50 dark:bg-neutral-900 hover:dark:ring-primary-300/50`}
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={`pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(45deg,transparent_25%,rgba(212,199,236,.3)_50%,transparent_75%,transparent_100%)]
       ease-out group-hover:translate-x-full group-hover:duration-1000`}
        ></span>
      </div>
      {info}{" "}
      <span className="font-semibold text-primary-500 dark:text-primary-300 inline-flex items-center">
        <span className="absolute inset-0" aria-hidden="true" />
        {link}{" "}
        <span aria-hidden="true" className="group-hover:translate-x-0.5 duration-150 ease-out">
          <ChevronRight size={16} className="text-primary-500 dark:text-primary-300" />
        </span>
      </span>
    </Link>
  );
}
