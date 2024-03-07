import { SettingsNav } from "@/components/admin/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <SettingsNav />
      {children}
    </div>
  );
}
