import { RenderMarkdown } from "@/components/render-markdown";
import { createClient } from "@/lib/supabase";
import { Title } from "@aomdev/ui";
import { allArticles } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { ActionIcon } from "./client";
import { Link, Unlink } from "lucide-react";
import { revalidatePath } from "next/cache";

type PropTypes = {
  params: {
    slug: string;
    id: string;
  };
};

export default async function ArticleMarkdown({ params }: PropTypes) {
  const article = allArticles.find(({ slug }) => slug === params.slug);
  if (!article) notFound();

  const { data: testData } = await createClient("server_component")
    .from("related_quiz_articles")
    .select("*")
    .eq("quiz_id", Number(params.id))
    .eq("article_slug", article.slug)
    .single();
  const articleLinked = testData !== null;
  const toggleLink = async (isLinked: boolean, quiz_id: number, article_slug: string) => {
    "use server";
    const client = createClient("server_action");
    if (isLinked) {
      await client
        .from("related_quiz_articles")
        .delete()
        .eq("quiz_id", quiz_id)
        .eq("article_slug", article_slug);
    } else {
      await client.from("related_quiz_articles").insert({ article_slug, quiz_id });
    }
    revalidatePath(`/admin/quizzes/${params.id}`);
  };

  return (
    <div className="w-4/6 ml-auto pb-16 pt-4 px-4 relative">
      <Title
        order={1}
        className="text-5xl font-heading text-semibold mb-6"
      >
        {article.title}
      </Title>
      <RenderMarkdown content={article.body.html || ""} />
      <form
        className="absolute top-4 right-4"
        action={toggleLink.bind(null, articleLinked, Number(params.id), params.slug)}
      >
        <ActionIcon color={articleLinked ? "success" : "warn"}>
          {articleLinked ? <Link size={"75%"} /> : <Unlink size={"75%"} />}
        </ActionIcon>
      </form>
    </div>
  );
}
