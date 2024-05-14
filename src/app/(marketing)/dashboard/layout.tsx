import { UserSidebar } from "./_components/user-sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex container mx-auto mt-20 gap-6 mb-20">
      <UserSidebar />
      <div className="grow">{children}</div>
    </div>
  );
}
