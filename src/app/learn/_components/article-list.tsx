"use client";
import { Article } from "./article";
import { useState } from "react";
import { ArticleFilter } from "./article-filter";
import type { ArticleProps } from "@/types/custom.types";

type PropTypes = {
  articles: ArticleProps[];
};

export type FilterProps = {
  history: boolean;
  geography: boolean;
  economy: boolean;
  environment: boolean;
};

export async function Articles({ articles }: PropTypes) {
  const [filter, setFilter] = useState({
    history: false,
    geography: false,
    economy: false,
    environment: false
  });
  // const filteredArticles = filterArticles(articles, filter);

  const onFilterChange = (key: keyof FilterProps, value: boolean) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <section className="border-t container mx-auto border-neutral-100 dark:border-neutral-700 pt-10 grid grid-cols-12 gap-5 mb-36">
        <div className="col-span-3">{/* <ArticleFilter onFilterChange={onFilterChange} /> */}</div>
        <div className="flex col-span-9 gap-5 gap-y-16 flex-wrap">
          {articles.map(article => {
            return <Article key={article.slug} {...article} />;
          })}
        </div>
      </section>
    </>
  );
}

// function filterArticles(articles: ArticleProps[], filters: FilterProps) {
//   let newArticles = articles.slice();

//   return newArticles;
// }
