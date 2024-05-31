"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type RouteTypes = "articles" | "quizzes";

function createRoute(href: string, label: string) {
  return {
    href,
    label
  };
}

function createNavbar(route: RouteTypes, id: string) {
  const routes = [
    { label: "Home", href: `/admin/${route}/${id}` },
    { label: "Settings", href: `/admin/${route}/${id}/settings` }
  ];
  return routes.map((route) => createRoute(route.href, route.label));
}

type Props = {
  route: RouteTypes;
  id: string;
};

export function Nav({ route, id }: Props) {
  const path = usePathname();
  const routes = createNavbar(route, id);
  console.log(routes);
  return (
    <div className="border-b py-4 dark:border-b-neutral-700 border-b-neutral-200 mb-4 z-30 sticky top-0 bg-neutral-900">
      <div className="mx-auto px-2 container">
        <ul className="flex gap-4">
          {routes.map((link) => {
            return (
              <li
                key={link.href}
                data-active={path === link.href}
                className="group"
              >
                <Link
                  className="group-data-[active=true]:text-primary-300 capitalize"
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
