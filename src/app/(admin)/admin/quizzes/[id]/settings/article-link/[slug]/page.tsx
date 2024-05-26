import { RenderMarkdown } from "@/components/render-markdown";
import { createClient } from "@/lib/supabase";
import { Button, Title } from "@aomdev/ui";
import { notFound } from "next/navigation";
import { Link, Unlink } from "lucide-react";
import { revalidatePath } from "next/cache";
import { getArticle } from "@/lib/get-articles";
import { EditorDialog } from "./dialog";
import { ArticleLinkForm } from "./article-link-form";

type PropTypes = {
  params: {
    slug: string;
    id: string;
  };
};

export default async function ArticleMarkdown({ params }: PropTypes) {
  const { data, error } = await getArticle(params.slug);
  if (error) notFound();

  const { data: testData } = await createClient("server_component")
    .from("related_quiz_articles")
    .select("*")
    .eq("quiz_id", Number(params.id))
    .eq("article_slug", data.slug)
    .single();
  const isLinked = testData !== null;

  return (
    <div className="w-4/6 ml-auto pb-16 pt-4 px-4 relative">
      <div className=" ml-auto w-fit flex items-center gap-4 mb-4">
        <EditorDialog
          defaultContent={data.content || ""}
          published={data.status === "published"}
          slug={data.slug}
          imgPath={data.thumbnail_path}
        />
        <ArticleLinkForm isLinked={isLinked} />
      </div>
      <Title
        order={1}
        className="text-5xl font-heading text-semibold mb-6"
      >
        {data.title}
      </Title>
      <RenderMarkdown content={data.content || ""} />
      <div></div>
    </div>
  );
}
