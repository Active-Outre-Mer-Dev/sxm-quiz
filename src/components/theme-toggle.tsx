"use client";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { ActionIcon } from "@aomdev/ui";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onToggle = () => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.remove("dark");
      setTheme("light");
    } else {
      html.classList.add("dark");
      setTheme("dark");
    }
  };

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <ActionIcon
      variant={"subtle"}
      onClick={onToggle}
      color={theme === "light" ? "primary" : "secondary"}
      aria-label="Toggle theme"
    >
      <Icon size={"60%"} />
    </ActionIcon>
  );
}
