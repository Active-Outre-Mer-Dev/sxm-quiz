import { NavItem } from "./nav-item";

export function SettingsNav() {
  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-b-neutral-200 dark:border-b-neutral-700 sticky top-0 px-4 z-50">
      <ul className="flex gap-4">
        <NavItem href={"/admin/settings"}>General</NavItem>
        <NavItem href={"/admin/settings/categories"}>Categories</NavItem>
        <NavItem href={"/admin/settings/random-facts"}>Random facts</NavItem>
      </ul>
    </div>
  );
}
