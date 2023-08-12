import { Github } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" border-t border-t-neutral-100 dark:border-t-neutral-700 py-5 flex items-center justify-between">
      <div className="w-11/12 lg:container mx-auto flex items-center justify-between h-full">
        <span className="text-gray-600 dark:text-gray-300">
          Built by <span className="underline">AOMDev</span>, {year}
        </span>
        <a
          title="Github"
          aria-label="Visit Github profile"
          href={"https://github.com/Active-Outre-Mer-Dev"}
          target={"_blank"}
          className="hover:bg-neutral-200/30 hover:dark:bg-neutral-600/30 flex items-center justify-center rounded-full h-7 w-7"
        >
          <Github size={"60%"} />
        </a>
      </div>
    </footer>
  );
}
