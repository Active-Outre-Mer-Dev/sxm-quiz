import { NavLink } from "@/components/nav-link";

export function UserSidebar() {
  return (
    <div className="basis-1/5 ">
      <ul className="space-y-4 sticky top-36">
        <NavLink href={"/dashboard"}>Home</NavLink>
        <NavLink href={"/dashboard/profile"}>Profile</NavLink>
        <NavLink href={"/dashboard/settings"}>Settings</NavLink>
      </ul>
    </div>
  );
}
