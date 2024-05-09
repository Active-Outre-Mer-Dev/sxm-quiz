import { Card, Title, Badge } from "@aomdev/ui";
import { GradientText } from "@/components/gradient-text";
import { InfoBadge } from "@/components/info-badge";
import { Author } from "@/components/author";
import { ArticleFilter } from "./_components/article-filter";
import Image from "next/image";
import Link from "next/link";
import { Article } from "./_components/article";
import { allArticles } from "contentlayer/generated";
import { Database } from "@/types/database.types";
import { formatDate } from "@/lib/format-date";
import { getCatColor } from "@/get-category-color";
import { RandomFacts } from "./_components/random-facts";
import { createClient } from "@/lib/supabase";

export const revalidate = 3600;

export default async function Page() {
  const supabase = createClient("server_component");

  const { data, error } = await supabase
    .from("articles")
    .select("created_at, slug, featured, community, views");
  if (error) throw new Error("There was an error fetching the articles");

  const articles = allArticles.map(({ slug, title, thumbnail, intro, category, author, profile }) => {
    const articleMetadata = data.find(
      (article) => article.slug.toLowerCase().trim() === slug.trim().toLowerCase()
    );
    if (!articleMetadata) throw new Error(`Must add ${slug} article metadata to supabase`);
    return {
      ...articleMetadata,
      title,
      thumbnail,
      intro,
      category,
      author,
      profile
    };
  });

  const randomArticle = articles[Math.floor(Math.random() * articles.length)];

  const recent = articles.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)).slice(0, 3);

  return (
    <>
      <section className="mb-20 w-11/12 text-center lg:container mx-auto pt-16">
        <InfoBadge
          href="/learn"
          info="Want to write your own articles?"
          link="Become a contributor"
        />
        <Title
          order={1}
          className="font-heading  leading-none my-4 "
        >
          <GradientText>All Articles</GradientText>
        </Title>
        <p className="text-2xl  mb-6">For Saint Martiners, by Saint Martiners</p>
        <div
          role="separator"
          className="h-[1px] bg-neutral-100 dark:bg-neutral-700 mb-10"
        />
      </section>
      <section className="grid grid-cols-6 lg:grid-cols-12 w-11/12 lg:container mx-auto gap-y-10 lg:gap-4">
        <Link
          href={"/learn"}
          className="col-span-8 group"
        >
          <figure className="col-span-8 relative aspect-video overflow-hidden">
            <Image
              src={randomArticle.thumbnail}
              alt=""
              fill
              className=" w-full h-full object-cover duration-700 ease-out group-hover:scale-105"
            />
          </figure>
          <div className="flex gap-6 items-center mt-2">
            <time className=" text-gray-600 dark:text-gray-300">
              {formatDate(new Date(randomArticle.created_at))}
            </time>
            <Badge color={getCatColor(randomArticle.category)}>{randomArticle.category}</Badge>
          </div>
          <Title
            order={2}
            className="font-heading dark:text-gray-50 text-gray-900 mb-2 font-medium group-hover:text-primary-500 group-hover:dark:text-primary-200"
          >
            {randomArticle.title}
          </Title>
          <p className="w-clamp mb-4">{randomArticle.intro}</p>
          <Author
            name={randomArticle.author}
            img={randomArticle.profile}
          />
        </Link>
        <Card className="col-span-6 w-full lg:col-span-4 bg-neutral-900 flex flex-col gap-10">
          <Title
            order={2}
            className="font-heading text-secondary-400 mb-6 font-medium"
          >
            New
          </Title>

          <ul className=" flex flex-col justify-between grow">
            {recent.map((article) => {
              return (
                <>
                  <li className="  pb-8 group">
                    <Link
                      href={`/learn/${article.category}/${article.slug}`}
                      className="space-y-3"
                    >
                      <span className="font-medium  text-gray-50 text-2xl font-heading group-hover:text-primary-500  group-hover:dark:text-primary-200">
                        {article.title}
                      </span>
                      <p className="text-gray-200 line-clamp-4">{article.intro}</p>
                    </Link>
                  </li>
                  <li
                    aria-hidden="true"
                    className="border-b border-neutral-700 h-[1px] last-of-type:hidden"
                  />
                </>
              );
            })}
          </ul>
        </Card>
      </section>
      <section className="container mx-auto bg-primary-200/30 dark:bg-primary-600/30 my-36 lg:rounded-md  min-h-[250px]">
        <RandomFacts />
      </section>
      <section className="border-t w-11/12 lg:container mx-auto gap-y-5 border-neutral-100 dark:border-neutral-700 pt-10 grid grid-cols-6 lg:grid-cols-12 lg:gap-5 mb-36">
        <div className="col-span-full lg:col-span-3">
          <ArticleFilter />
        </div>
        <div className="flex col-span-full lg:col-span-9 gap-10 lg:gap-y-16 flex-col lg:flex-row flex-wrap">
          {articles.map((article) => {
            return (
              <Article
                key={article.slug}
                {...article}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
