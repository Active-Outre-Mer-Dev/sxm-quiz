"use client";
import { Command } from "@aomdev/ui";
import { useState, useEffect } from "react";
import { SearchIcon, FileText, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSlug } from "@/create-slug";

const defaultItems = {
  nameAll: ["All SXM Beaches"],
  multipleChoice: ["General History", "General Geography", "General Environment"]
};

export function Searchbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const openMenu = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", openMenu);
    return () => window.removeEventListener("keydown", openMenu);
  }, []);

  const onNavigate = (value: string) => {
    router.push(`/${value}`);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md items-center flex gap-1 px-4 min-w-fit text-neutral-500 h-8 ring-1 ring-neutral-200"
      >
        <SearchIcon size={14} className="text-neutral-500" />
        Search...
        <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 inline-block ml-6 p-[1px] rounded-sm">
          Ctrl K
        </kbd>
      </button>
      <Command contentProps={{ className: "w-2/4", blur: true }} open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search" />
        <Command.List>
          <Command.Group heading="Articles">
            <Command.Item value="learn/history/sxm-history" onSelect={onNavigate}>
              <FileText size={16} className="inline-block mr-2 text-neutral-700" />
              SXM History Intro
            </Command.Item>
          </Command.Group>
          <Command.Seperator />
          <Command.Group heading="Question Quizzes">
            {defaultItems.multipleChoice.map(quiz => {
              const slug = createSlug(quiz);
              return (
                <Command.Item value={`quiz/${slug}`} onSelect={onNavigate} key={slug}>
                  <Circle size={16} className="inline-block mr-2 text-neutral-700" />
                  {quiz}
                </Command.Item>
              );
            })}
          </Command.Group>
          <Command.Seperator />
          <Command.Group heading="List Quizzes">
            {defaultItems.nameAll.map(quiz => {
              const slug = createSlug(quiz);
              return (
                <Command.Item key={slug} onSelect={onNavigate} value={`quiz/${slug}`}>
                  <Circle size={16} className="inline-block mr-2 text-neutral-700" />
                  {quiz}
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>
      </Command>
    </>
  );
}
