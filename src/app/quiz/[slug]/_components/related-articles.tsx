"use client";
import { Badge } from "@aomdev/ui";
import { getCatColor } from "@/get-category-color";
import Link from "next/link";
import { useQuiz } from "./container/container.context";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.data as { title: string; category: string; slug: string }[];
};
export function RelatedArticles() {
  const { id } = useQuiz();
  const { data: relatedArticles } = useSWR(`/api/related-articles?id=${id}`, fetcher, { fallbackData: [] });

  return (
    <div>
      <p className="mb-6 text-neutral-600 font-medium">Related Articles</p>
      {relatedArticles.length > 0 ? (
        <ul className="space-y-4">
          {relatedArticles.map(article => {
            const { title, category, slug } = article;
            return (
              <li className="group" key={article.slug}>
                <Link className="flex justify-between item-center" href={`/learn/${category}/${slug}`}>
                  <span className="block capitalize group-hover:text-primary-500 duration-200 ease-out font-medium">
                    {title}
                  </span>
                  <Badge color={getCatColor(category)} className="capitalize">
                    {category}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-700 font-medium">Coming soon</p>
      )}
    </div>
  );
}
