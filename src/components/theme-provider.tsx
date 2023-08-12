"use client";
import { ThemeProvider as NextThemes } from "next-themes";

type PropTypes = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: PropTypes) {
  return <NextThemes attribute="class">{children}</NextThemes>;
}
