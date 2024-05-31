"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Dropdown } from "@aomdev/ui";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  if (typeof window === "undefined") {
    throw new Error("Client only");
  }

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button
          className="flex items-center hover:dark:bg-neutral-600/30 hover:bg-neutral-200/30 w-full rounded p-2"
          aria-label="Toggle theme"
        >
          <Sun
            size={16}
            className="inline-block dark:hidden mr-2"
          />
          <Moon
            size={16}
            className="dark:inline-block hidden mr-2"
          />

          <span className="capitalize">{theme}</span>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content style={{ zIndex: 9999 }}>
        <Dropdown.Item
          onClick={() => setTheme("light")}
          icon={<Sun size={"16px"} />}
        >
          Light
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setTheme("dark")}
          icon={<Moon size={"16px"} />}
        >
          Dark
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setTheme("system")}
          icon={<Monitor size={"16px"} />}
        >
          System
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
