import { User } from "@/app/(admin)/_components/users";
import { inputStyles } from "@aomdev/ui/src/input-wrapper/styles";
import {
  ExternalLink,
  Home,
  LucideIcon,
  Search,
  FilePen,
  Book,
  Settings,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { SignOut } from "./signout";
import dynamic from "next/dynamic";
import { ThemeLoading } from "./theme-loading";

const ThemeToggle = dynamic(() => import("@/components/admin/theme"), {
  ssr: false,
  loading: () => <ThemeLoading />
});

function createLink(label: string, href: string, Icon: LucideIcon) {
  return {
    label,
    href: `/admin/${href}`,
    Icon
  };
}

const links = [
  createLink("Home", "", Home),
  createLink("Quizzes", "quizzes", FilePen),
  createLink("Articles", "articles", Book),
  createLink("Settings", "settings", Settings)
];

export function AdminNav() {
  return (
    <header className="h-screen fixed top-0 left-0 w-1/6 flex flex-col justify-between  border-r border-r-neutral-700">
      <div>
        <div className="border-b border-b-neutral-700 w-full p-4">
          <User />
        </div>

        <div className="p-4 space-y-4">
          <button
            className={inputStyles({
              className: "px-2 text-sm flex gap-2 justify-between items-center w-full ",
              size: "sm"
            })}
          >
            <div className="flex gap-1 items-center">
              <Search size={14} />
              Search
            </div>
            <kbd className="bg-gray-800 border border-gray-700 rounded px-1">CTRL K</kbd>
          </button>
          <nav className="w-full">
            <ul className="space-y-4">
              {links.map((link) => {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:bg-neutral-600/30 w-full p-2 rounded flex items-center"
                    >
                      <link.Icon
                        size={16}
                        className="inline-block mr-2 text-gray-300"
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="pb-8 px-4 border-t border-t-neutral-700 pt-8 space-y-2">
        <Link
          href={"/"}
          className="w-full rounded hover:bg-neutral-600/30 p-2 items-center flex"
        >
          <ExternalLink
            size={16}
            className="inline-block mr-2"
          />{" "}
          Return to SXM Quiz
        </Link>
        <Link
          href={"/dashboard"}
          className="w-full rounded hover:bg-neutral-600/30 p-2 items-center flex"
        >
          <UserIcon
            size={16}
            className="inline-block mr-2"
          />
          View dashboard
        </Link>
        <ThemeToggle />
        <SignOut />
      </div>
    </header>
  );
}
