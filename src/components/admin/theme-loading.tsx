import { Monitor } from "lucide-react";

export function ThemeLoading() {
  return (
    <button
      className="flex items-center hover:bg-neutral-600/30 w-full rounded p-2"
      aria-label="Toggle theme"
    >
      <Monitor
        size={16}
        className="inline-block mr-2"
      />
      <span>System</span>
    </button>
  );
}
