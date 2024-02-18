"use client";
import { Badge, Command } from "@aomdev/ui";
import { useState, useEffect } from "react";
import { SearchIcon, FileText, CircleDot, Newspaper, List, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Quiz } from "@/types/custom.types";
import type { Article, Blog } from "contentlayer/generated";
import { ScrollArea } from "@aomdev/ui";

type PropTypes = {
  multipleChoice: Quiz[];
  nameAll: Quiz[];
  articles: Article[];
  blogs: Blog[];
};

export default function Searchbar(props: PropTypes) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const openMenu = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onBackspace = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        setPage("");
      }
    };
    window.addEventListener("keydown", openMenu);
    window.addEventListener("keydown", onBackspace);
    return () => {
      window.removeEventListener("keydown", openMenu);
      window.removeEventListener("keydown", onBackspace);
    };
  }, []);

  const onNavigate = (value: string) => {
    router.push(`/${value}`);
    setOpen(false);
    setPage("");
  };

  const onToggle = (val: boolean) => {
    setPage("");
    setOpen(val);
  };

  const onSelect = (value: string) => setPage(value);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md items-center flex gap-1 px-4 min-w-fit text-neutral-500 dark:text-neutral-200 h-8 ring-1 ring-neutral-200 dark:ring-neutral-700"
      >
        <SearchIcon
          size={14}
          className="text-neutral-500 dark:text-neutral-300"
        />
        Search...
        <kbd className="text-xs bg-neutral-200/30 dark:bg-neutral-600/30 ring-1 ring-neutral-100 dark:ring-neutral-700 inline-block ml-6 p-[1px] rounded-sm">
          Ctrl K
        </kbd>
      </button>
      <Command
        contentProps={{ className: "w-2/4 relative pb-6 overflow-hidden", blur: true }}
        open={open}
        onOpenChange={onToggle}
      >
        <Command.Input placeholder="Search" />
        <div className="flex gap-2 px-4 mb-2">
          <Badge
            variant={"light"}
            size={"sm"}
          >
            Home
          </Badge>
          {page && (
            <Badge
              variant={"light"}
              size={"sm"}
              className="capitalize"
            >
              {page}
            </Badge>
          )}
        </div>
        <Command.List>
          <ScrollArea
            style={{ height: window.screen.height / 2 }}
            className="-mx-4 px-4"
          >
            {page.toLowerCase() === "multiple choice" && (
              <Quiz
                onNavigate={onNavigate}
                quizzes={props.multipleChoice}
              />
            )}
            {page.toLowerCase() === "name all" && (
              <Quiz
                onNavigate={onNavigate}
                quizzes={props.nameAll}
              />
            )}
            {page.toLowerCase() === "articles" && (
              <Articles
                onNavigate={onNavigate}
                articles={props.articles}
              />
            )}
            {page.toLocaleLowerCase() === "blogs" && (
              <Blogs
                blogs={props.blogs}
                onNavigate={onNavigate}
              />
            )}
            {!page && <Default onNavigate={onSelect} />}
          </ScrollArea>
        </Command.List>
        <div
          className={`absolute bg-white dark:bg-neutral-800 px-4 text-sm dark:text-gray-300 text-gray-500 flex items-center justify-between bottom-0 left-0 
        h-10 border-t w-full border-t-neutral-100 dark:border-t-neutral-700`}
        >
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                  <ChevronUp size={16} />
                </kbd>
                <kbd className="text-xs rotate-180 bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                  <ChevronUp size={16} />
                </kbd>
              </span>
              <span className="font-medium ">Navigate</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="text-sm bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                esc
              </kbd>
              <span className="font-medium ">Close</span>
            </span>
            <span>
              <kbd className="text-xs bg-neutral-200/30 ring-1 ring-neutral-100 dark:bg-neutral-600/30 dark:ring-neutral-700 inline-block  p-[1px] rounded-sm">
                CTRL /
              </kbd>{" "}
              <span className="font-medium">Back </span>
            </span>
          </div>
        </div>
      </Command>
    </>
  );
}

type Props = { quizzes: Quiz[]; onNavigate: (val: string) => void };

function Quiz({ onNavigate, quizzes }: Props) {
  return (
    <>
      {quizzes.map((quiz) => {
        return (
          <Command.Item
            onSelect={onNavigate}
            value={`quiz/${quiz.slug}`}
            key={quiz.id}
          >
            {quiz.title}
          </Command.Item>
        );
      })}
    </>
  );
}
type ArticleProps = Pick<PropTypes, "articles"> & { onNavigate: (val: string) => void };

function Articles({ articles, onNavigate }: ArticleProps) {
  return (
    <>
      {articles.map((article) => {
        return (
          <Command.Item
            value={`learn/${article.category}/${article.slug}`}
            onSelect={onNavigate}
            key={article.slug}
          >
            {article.title}
          </Command.Item>
        );
      })}
    </>
  );
}

type BlogProps = Pick<PropTypes, "blogs"> & { onNavigate: (val: string) => void };

function Blogs({ blogs, onNavigate }: BlogProps) {
  return (
    <>
      {blogs.map((blog) => {
        return (
          <Command.Item
            value={`blog/${blog.slug}`}
            key={blog.slug}
            onSelect={onNavigate}
          >
            {blog.title}
          </Command.Item>
        );
      })}
    </>
  );
}

function Default({ onNavigate }: { onNavigate: (value: string) => void }) {
  return (
    <>
      <Command.Group heading="Quizzes">
        <Command.Item
          onSelect={onNavigate}
          value="Multiple Choice"
        >
          <CircleDot
            size={16}
            className="inline-block mr-2 text-gray-600 dark:text-gray-200"
          />{" "}
          Multiple Choice
        </Command.Item>
        <Command.Item
          onSelect={onNavigate}
          value="Name All"
        >
          <List
            size={16}
            className="inline-block mr-2 text-gray-600 dark:text-gray-200"
          />
          Name All
        </Command.Item>
      </Command.Group>
      <Command.Seperator />
      <Command.Group heading="Resources">
        <Command.Item
          onSelect={onNavigate}
          value="Blogs"
        >
          <Newspaper
            size={16}
            className="inline-block mr-2 text-gray-600 dark:text-gray-200"
          />
          Blogs
        </Command.Item>
        <Command.Item
          onSelect={onNavigate}
          value="Articles"
        >
          <FileText
            size={16}
            className="inline-block mr-2 text-gray-600 dark:text-gray-200"
          />{" "}
          Articles
        </Command.Item>
      </Command.Group>
    </>
  );
}
