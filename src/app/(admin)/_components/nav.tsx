"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Home",
    href: "/admin"
  },
  {
    label: "Articles",
    href: "/admin/articles"
  },
  {
    label: "Quizzes",
    href: "/admin/quizzes"
  }
];

const quizLinks = [
  {
    label: "Quizzes",
    href: "/admin/quizzes"
  },

  {
    label: "Analytics",
    href: "/admin/quizzes/Wanalytics"
  },
  {
    label: "Settings",
    href: "/admin/quizzes/settings"
  }
];

const navLinks = {
  home: links,
  quizzes: quizLinks
};

type Props = {
  route: keyof typeof navLinks;
};

export function Nav({ route }: Props) {
  const path = usePathname();
  console.log(path);
  return (
    <div className="border-b pb-4 border-b-neutral-700 mb-4 sticky top-16">
      <div className="mx-auto w-11/12">
        <ul className="flex gap-4">
          {navLinks[route].map((link) => {
            return (
              <li
                key={link.href}
                data-active={path === link.href}
                className="group"
              >
                <Link
                  className="group-data-[active=true]:text-primary-300"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
