"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { ActionIcon, Dropdown } from "@aomdev/ui";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <ActionIcon
          variant={"subtle"}
          className="dark:bg-secondary-600/30 dark:text-secondary-200 bg-tertiary-200/30 text-tertiary-600"
          aria-label="Toggle theme"
        >
          <Sun size={"60%"} className="dark:inline-block hidden" />
          <Moon size={"60%"} className="inline-block dark:hidden" />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Content style={{ zIndex: 9999 }}>
        <Dropdown.Item onClick={() => setTheme("light")} icon={<Sun size={"16px"} />}>
          Light
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("dark")} icon={<Moon size={"16px"} />}>
          Dark
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("system")} icon={<Monitor size={"16px"} />}>
          System
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
