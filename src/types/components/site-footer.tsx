import { Github } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-t-neutral-100 py-5 flex items-center justify-between">
      <div className="w-11/12 lg:container mx-auto flex items-center justify-between h-full">
        <span className="text-neutral-600">
          Built by <span className="underline">AOMDev</span>, {year}
        </span>
        <a
          title="Github"
          aria-label="Visit Github profile"
          href={"https://github.com/Active-Outre-Mer-Dev"}
          target={"_blank"}
          className="hover:bg-neutral-200/30 flex items-center justify-center rounded-full h-7 w-7"
        >
          <Github size={"60%"} />
        </a>
      </div>
    </footer>
  );
}
