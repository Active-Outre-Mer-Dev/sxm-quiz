import { Title } from "@aomdev/ui";
import { TableOfContents } from "@/components/toc";
import { notFound } from "next/navigation";
import { ShareButton } from "./share-article";
import { ExternalLink } from "./external-link";
import { MobileTOC } from "./mobile-toc";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { ArticleEvent } from "./article-event";
import { Suspense } from "react";

import { Author } from "@/components/author";
import { createClient } from "@/lib/supabase/server";
import { Article } from "contentlayer/generated";
import { addIds, getHTMLHeadings, getReadTime } from "@/lib/get-html-headings";

export default async function Page({ params }: { params: { slug: string; category: string } }) {
  const supabase = createClient();
  const { error, data } = await supabase
    .from("articles")
    .select("*, profiles(*)")
    .eq("slug", params.slug)
    .single();
  const { error: relatedError, data: relatedData } = await supabase
    .from("articles")
    .select("intro, title, thumbnail, category, slug")
    .neq("slug", params.slug)
    .eq("category", params.category)
    .limit(3);

  if (error || relatedError) notFound();

  const newContent = addIds(data?.content || "");
  const headings = getHTMLHeadings(data.content || "");
  const readTime = getReadTime(data.content || "");

  const color =
    params.category === "history"
      ? "text-error-600 dark:text-error-200"
      : params.category === "geography"
        ? "text-secondary-600 dark:text-secondary-200"
        : params.category === "environment"
          ? "text-success-600 dark:text-success-200"
          : "text-tertiary-600 dark:text-tertiary-200";

  return (
    <>
      <Suspense fallback={null}>
        <ExternalLink />
        <ArticleEvent />
      </Suspense>

      <div className="flex gap-2 justify-center lg:justify-start  lg:w-4/6 items-center border-b border-neutral-200 dark:border-neutral-700 pb-5 mb-10">
        <span className="text-3xl font-medium text-neutral-900 dark:text-gray-50">Articles</span>
        <span
          role="separator"
          className="h-10 w-[2px] bg-neutral-900 dark:bg-neutral-400"
        />
        <span className={`${color} font-medium text-3xl capitalize`}>{params.category}</span>
      </div>
      <div className="mb-16 lg:mb-36 flex gap-7">
        <div className=" lg:basis-4/6">
          <article className="lg:mb-16">
            <div className="mb-10">
              <header className="flex items-center justify-between mb-4">
                <h1
                  id={"intro"}
                  className={
                    "text-4xl text-center lg:text-start leading-none font-medium font-heading text-gray-900 dark:text-gray-50"
                  }
                >
                  {data.title}
                </h1>
                <ShareButton title={data.title} />
              </header>
              <p
                style={{ width: "clamp(36ch, 90%, 75ch)" }}
                className="text-lg mb-4"
              >
                {data.intro}
              </p>
              <span className="text-gray-600 dark:text-gray-300 text-sm block mb-6">
                {formatDate(new Date(data.created_at))} - {readTime} min read
              </span>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Author
                    firstName={data.profiles?.first_name}
                    lastName={data.profiles?.last_name}
                    img={data.profiles?.profile_image}
                  />
                </div>
              </div>
            </div>
            <img
              src={data.thumbnail || ""}
              alt={""}
              className={"rounded-xl mb-10"}
            />
            <MobileTOC
              headings={headings}
              {...params}
            />
            <div
              className={`prose-ul:list-disc prose-headings:font-medium prose-h2:mt-10 prose-lg prose-h2:mb-4
               prose-h2:text-3xl prose-a:text-primary-200 prose-ol:pl-4 prose-ul:pl-4 prose-ol:list-decimal`}
              dangerouslySetInnerHTML={{ __html: newContent }}
            ></div>
          </article>
          <div className="space-y-10 mt-16 lg:mt-0 lg:space-y-16">
            <Title
              order={2}
              className="font-medium font-heading lg:mb-6"
            >
              Related Articles
            </Title>
            {relatedData.map((article) => {
              return (
                <RelatedArticles
                  key={article.slug}
                  {...article}
                />
              );
            })}
          </div>
        </div>
        <TableOfContents
          headings={headings}
          githubEdit
        />
      </div>
    </>
  );
}

type Props = Pick<Article, "intro" | "title" | "thumbnail" | "category" | "slug">;

function RelatedArticles(props: Props) {
  return (
    <Link
      href={`/learn/${props.category}/${props.slug}`}
      className="flex flex-col lg:flex-row gap-4 group"
    >
      <figure className="basis-1/3 grow aspect-video">
        <img
          src={props.thumbnail}
          className="w-full h-full object-cover  rounded-xl"
          alt={""}
        />
      </figure>
      <div className="basis-2/3 grow">
        <Title
          order={3}
          className="font-heading font-medium mb-4 group-hover:text-primary-500 group-hover:dark:text-primary-200"
        >
          {props.title}
        </Title>
        <p className="line-clamp-3">{props.intro}</p>
      </div>
    </Link>
  );
}
