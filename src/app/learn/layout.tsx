import { NavLink } from "./nav-link";
import { LayoutGrid } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav
        style={{ height: "calc(100vh - 64px)" }}
        className="w-1/6 p-4 hidden lg:block  space-y-6 fixed top-16 left-0"
      >
        <div>
          <p className="text-lg flex items-center gap-2 text-neutral-700 font-medium mb-2">
            <LayoutGrid size={18} className="text-neutral-700" />
            Categories
          </p>
          <ul className="w-full">
            <NavLink href={"/learn/history"}>History</NavLink>
            <NavLink href={"/learn/geography"}>Geography</NavLink>
            <NavLink href={"/learn/economy"}>Economy</NavLink>
            <NavLink href={"/learn/environment"}>Environment</NavLink>
          </ul>
        </div>
      </nav>
      <div className="lg:ml-auto lg:w-5/6 px-4 mt-10">{children}</div>
    </main>
  );
}
