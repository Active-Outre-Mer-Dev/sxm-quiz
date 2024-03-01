"use client";
import { ScrollArea, TextInput, ThemeIcon } from "@aomdev/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Link as LinkIcon, Unlink } from "lucide-react";
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
};

function filterArticles(articles: PropTypes["articles"], value: string) {
  return articles.filter((article) => article.title.toLowerCase().includes(value.toLowerCase().trim()));
}
export function ArticleSidebar({ articles }: PropTypes) {
  const params = useParams();
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearch(value);
  };

  const filteredArticles = filterArticles(articles, search);

  return (
    <div className="w-2/6 border-r border-r-neutral-700 ">
      <div className="sticky top-12 ">
        <ScrollArea style={{ height: "calc(100vh - 64px)" }}>
          <div className="px-4 pt-4">
            <div className="mb-4">
              <TextInput
                icon={<Search size={16} />}
                placeholder="Search"
                onChange={handleSearch}
              />
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
