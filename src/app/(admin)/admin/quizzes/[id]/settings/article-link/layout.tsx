import { createClient } from "@/lib/supabase";
import { ArticleSidebar } from "./article-sidebar";
import { allArticles } from "contentlayer/generated";

export default async function ArticleLinkLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const client = createClient("server_component");
  const { data, error } = await client.from("articles").select("*").eq("status", "published");
  const { data: testData } = await client
    .from("related_quiz_articles")
    .select("*")
    .eq("quiz_id", Number(params.id));

  if (error) throw error;

  const articles = data.map((article) => {
    const data = allArticles.find((data) => data.slug === article.slug);
    if (!data) throw new Error("Data out of sync");
    const isLinked = testData?.find((t) => t.article_slug === data.slug);

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      description: data.intro,
      slug: data.slug,
      content: data.body.html,
      isLinked: isLinked !== undefined
    };
  });

  return (
    <div className=" relative -mt-4 flex">
      <ArticleSidebar articles={articles} />
      {children}
    </div>
  );
}
