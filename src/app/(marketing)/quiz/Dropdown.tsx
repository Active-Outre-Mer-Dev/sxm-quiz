"use client";
import { MoreVertical, Bookmark, Share } from "lucide-react";
import { Dropdown as UiDropdown } from "@aomdev/ui";

export function Dropdown() {
  return (
    <UiDropdown>
      <UiDropdown.Trigger asChild>
        <button className="absolute text-neutral-600 top-4 flex justify-center items-center right-4 rounded-full h-5 w-5 border border-neutral-400">
          <MoreVertical />
        </button>
      </UiDropdown.Trigger>
      <UiDropdown.Content side="left">
        <UiDropdown.Item icon={<Bookmark size={14} />}>Bookmark</UiDropdown.Item>
        <UiDropdown.Item icon={<Share size={14} />}>Share</UiDropdown.Item>
      </UiDropdown.Content>
    </UiDropdown>
  );
}
