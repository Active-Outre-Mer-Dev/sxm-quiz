"use client";
import { useRef } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function Search() {
  const ref = useRef<HTMLInputElement>(null);
  const onClick = () => {
    ref.current?.focus();
  };
  return (
    <div
      onClick={onClick}
      className={`flex gap-4 duration-200 ease-out hover:cursor-text focus-within:ring-1 ring-primary
       items-center bg-surface-variant rounded-full pl-4`}
    >
      <MagnifyingGlassIcon className="text-on-surface-variant" width={18} height={18} />
      <input
        ref={ref}
        placeholder="Search"
        className={`bg-surface-variant body-large grow 
            text-on-surface outline-none appearance-none 
            rounded-full 
            h-12 placeholder:text-on-surface-variant`}
        type={"text"}
      />
    </div>
  );
}
