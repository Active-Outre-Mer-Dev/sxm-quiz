"use client";
import { ScrollArea, TextInput, ThemeIcon, Dropdown, ActionIcon } from "@aomdev/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Link as LinkIcon, Unlink, Settings } from "lucide-react";
import { ChangeEvent, useState } from "react";

type PropTypes = {
  articles: {
    title: string;
    thumbnail: string;
    description: string;
    slug: string;
    content: string;
    isLinked: boolean;
  }[];
  children: React.ReactNode;
};

function filterArticles(articles: PropTypes["articles"], value: string, showLinked?: string) {
  return articles.filter((article) => {
    if (showLinked === "linked") {
      return article.title.toLowerCase().includes(value.toLowerCase().trim()) && article.isLinked;
    }
    if (showLinked === "unlinked") {
      return article.title.toLowerCase().includes(value.toLowerCase().trim()) && !article.isLinked;
    }
    return article.title.toLowerCase().includes(value.toLowerCase().trim());
  });
}
export function ArticleSidebar({ articles, children }: PropTypes) {
  const params = useParams();
  const [search, setSearch] = useState("");
  const [linkStatus, setLinkStatus] = useState<"all" | "linked" | "unlinked">("all");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
  };

  const filteredArticles = filterArticles(articles, search, linkStatus);

  return (
    <div className="w-2/6 border-r border-r-neutral-700 ">
      <div className="sticky top-12 ">
        <ScrollArea style={{ height: "calc(100vh - 64px)" }}>
          <div className="px-4 pt-4">
            {children}
            <div className="mb-4 mt-4 flex items-center gap-6">
              <div className="grow">
                <TextInput
                  icon={<Search size={16} />}
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </div>
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <ActionIcon>
                    <Settings size={"75%"} />
                  </ActionIcon>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onSelect={setLinkStatus.bind(null, "all")}>All articles</Dropdown.Item>
                  <Dropdown.Item onSelect={setLinkStatus.bind(null, "linked")}>Linked articles</Dropdown.Item>
                  <Dropdown.Item onSelect={setLinkStatus.bind(null, "unlinked")}>
                    Unlinked articles
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </div>

            <ul className="space-y-4">
              {[...filteredArticles].map((article) => {
                return (
                  <li
                    key={article.slug}
                    data-selected={article.slug === params.slug}
                    className={`data-[selected=true]:bg-primary-500  rounded hover:bg-primary-600/20 
                  data-[selected=false]:hover:text-primary-300 relative`}
                  >
                    <Link
                      className="p-4 block"
                      href={`/admin/quizzes/${params.id}/settings/article-link/${article.slug}`}
                    >
                      {article.title}
                    </Link>
                    <ThemeIcon
                      color={article.isLinked ? "success" : "warn"}
                      variant={article.slug === params.slug ? "filled" : "light"}
                      size={"md"}
                      className="absolute top-2 right-2"
                    >
                      {article.isLinked ? <LinkIcon size={"75%"} /> : <Unlink size={"75%"} />}
                    </ThemeIcon>
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
