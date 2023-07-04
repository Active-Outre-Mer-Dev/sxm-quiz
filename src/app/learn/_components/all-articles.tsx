"use client";
import { Article as ArticleType } from "../page";
import { Article } from "./article";
import { ArticleFilter } from "./article-filter";
import { useState } from "react";
import { ActionIcon } from "@aomdev/ui";
import { ChevronRight } from "lucide-react";

type PropTypes = {
  articles: ArticleType[];
};

export function AllArticlesList({ articles }: PropTypes) {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);

  const resultsPerPage = 6;
  const totalPages = Math.ceil(articles.length / resultsPerPage);
  const lastIndex = page * resultsPerPage;
  const firstIndex = lastIndex - resultsPerPage;
  const sortedArticles = sortArticles(articles, value).slice(firstIndex, lastIndex);

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const prevPage = () => {
    setPage(prev => prev - 1);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-x-8 gap-y-16">
        <div className="col-span-full flex justify-between items-center">
          <ArticleFilter value={value} onValueChange={setValue} />
          <div className="flex gap-2">
            <ActionIcon
              aria-label="Previous page"
              className="disabled:grayscale disabled:opacity-50 rotate-180"
              disabled={page === 1}
              onClick={prevPage}
            >
              <ChevronRight />
            </ActionIcon>
            <ActionIcon
              className="disabled:grayscale disabled:opacity-50 "
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={nextPage}
            >
              <ChevronRight />
            </ActionIcon>
          </div>
        </div>
        {sortedArticles.map(article => {
          const [firstName, lastName] = article.author.split(" ");
          return <Article article={article} initials={`${firstName[0]}${lastName[0]}`} key={article.slug} />;
        })}
      </div>
    </>
  );
}

function sortArticles(articles: ArticleType[], value: string) {
  switch (value) {
    case "recent": {
      return articles.sort((a, c) => Date.parse(c.created_at) - Date.parse(a.created_at));
    }
    case "popular": {
      return articles.sort((a, c) => c.views - a.views);
    }
    case "oldest": {
      return articles.sort((a, c) => Date.parse(a.created_at) - Date.parse(c.created_at));
    }
    default: {
      return articles;
    }
  }
}
