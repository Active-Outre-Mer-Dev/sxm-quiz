import { NavLink } from "@/components/nav-link";

export function ArticleFilter() {
  return (
    <div className="sticky top-20">
      <p className="font-medium text-lg mb-4">Categories</p>
      <ul className="border-b border-neutral-100 dark:border-neutral-700 pb-10  space-y-4">
        <NavLink href={"/learn/history"}>History</NavLink>
        <NavLink href={"/learn/geography"}>Geography</NavLink>
        <NavLink href={"/learn/economy"}>Economy</NavLink>
        <NavLink href={"/learn/environment"}>Environment</NavLink>
      </ul>
    </div>
  );
}
