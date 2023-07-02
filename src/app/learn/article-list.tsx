import { Title, Badge } from "@aomdev/ui";
import Image from "next/image";
import { getCatColor } from "@/get-category-color";
import { Select } from "./client";
import profile from "@/assets/agis.jpg";
import Link from "next/link";
import { getAllMetadata } from "@/lib/get-content";

import type { QuestionCategory } from "@/questions";

type PropTypes = {
  title?: "Community" | "Featured" | "Recently added" | "All";
  category: string;
  type?: string;
};

export function Articles({ title, category, type }: PropTypes) {
  const articles = type
    ? getAllMetadata().filter(({ data }) => data.metadata.type === type)
    : getAllMetadata();

  return (
    <>
      {title && (
        <Title order={2} className="font-heading mb-10">
          {title} articles
        </Title>
      )}

      {articles.length === 0 && (
        <Title order={2} className="font-heading mb-10">
          Coming soon
        </Title>
      )}
      <div className="grid lg:grid-cols-3 gap-x-8 gap-y-16">
        {title === "All" && (
          <div className="col-span-full">
            <Select
              items={[
                { label: "Popular", value: "popular" },
                { label: "Recent", value: "recent" }
              ]}
            />
          </div>
        )}
        {articles.map((article, key) => {
          const { metadata } = article.data;
          return (
            <Link href={`/learn/${category}/${article.slug}`} key={key} className="overflow-hidden group">
              <figure
                className={`rounded-xl overflow-hidden h-36 mb-4 px-2 relative flex items-center 
              justify-center  `}
              >
                <Image
                  src={metadata.thumbnail}
                  fill
                  alt=""
                  className=" object-cover group-hover:scale-110 duration-200 ease-out"
                />
              </figure>
              <Title
                order={3}
                className={`relative group-hover:text-primary-500 font-medium capitalize font-heading mb-4
                duration-200 ease-out`}
              >
                {metadata.title}
              </Title>
              <p className="mb-4">{metadata.intro}</p>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.src}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    alt={""}
                  />
                  <div>
                    <span className="block text-sm font-medium">{metadata.author}</span>
                    <span className="block text-sm text-neutral-600">{metadata.creationDate}</span>
                  </div>
                </div>
                <Badge className="capitalize" color={getCatColor(metadata.type as QuestionCategory)}>
                  {metadata.type}
                </Badge>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
