import { SearchIcon } from "lucide-react";

export function SearchbarLoading() {
    return <button
    className="rounded-md items-center flex gap-1 px-4 min-w-fit text-neutral-500 h-8 ring-1 ring-neutral-200"
  >
    <SearchIcon size={14} className="text-neutral-500" />
    Search...
    <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 inline-block ml-6 p-[1px] rounded-sm">
      Ctrl K
    </kbd>
  </button>
}