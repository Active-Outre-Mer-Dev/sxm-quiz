import type { BadgeProps } from "@aomdev/ui";

export function getCatColor(type: string): BadgeProps["color"] {
  switch (type) {
    case "economy": {
      return "primary";
    }

    case "general": {
      return "success";
    }
    case "geography": {
      return "secondary";
    }
    case "history": {
      return "error";
    }
    default:
      return "success";
  }
}
