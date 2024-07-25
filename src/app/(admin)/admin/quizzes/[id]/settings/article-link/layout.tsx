import { createClient } from "@/lib/supabase/server";
import { ArticleSidebar } from "./article-sidebar";
import { SettingsBreadcrumbs } from "@/components/admin/settings-breadcrumbs";
import { getArticles } from "@/lib/data-fetch/get-articles";

export default async function ArticleLinkLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const client = createClient();
  const { data, error } = await getArticles();

  const { data: testData } = await client
    .from("related_quiz_articles")
    .select("*")
    .eq("quiz_id", Number(params.id));

  if (error) throw error;

  const articles = data.map((article) => {
    const isLinked = testData?.find((t) => t.article_slug === article.slug);
    return {
      title: article.title,
      thumbnail: article.thumbnail,
      description: article.intro,
      slug: article.slug,
      content: article.content || "",
      isLinked: isLinked !== undefined
    };
  });

  return (
    <div className=" relative -mt-4 flex">
      <ArticleSidebar articles={articles}>
        <SettingsBreadcrumbs
          id={params.id}
          link="Link Articles"
          route="quizzes"
        />
      </ArticleSidebar>
      {children}
    </div>
  );
}
