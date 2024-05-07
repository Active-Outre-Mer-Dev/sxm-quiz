import { Title } from "@aomdev/ui";
import Tiptap from "./_client/editor";
import { allArticles } from "contentlayer/generated";
import { createClient } from "@/lib/supabase";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = allArticles.find((article) => article.slug === params.slug)!;

  const { error, data } = await createClient("server_component")
    .from("articles")
    .select("*, profiles (first_name, last_name, profile_image)")
    .eq("slug", params.slug)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  const articleData = {
    title: data.title || "",
    author: `${data.profiles?.first_name} ${data.profiles?.last_name}`,
    category: data.category,
    intro: data.category,
    thumbnail: data.thumbnail || "",
    profile: data.profiles?.profile_image || undefined
  };

  return (
    <main className="p-2">
      <div
        style={{ zIndex: 9999 }}
        className="flex items-center border-b justify-between border-b-neutral-700 mb-4 z-50 bg-neutral-900"
      >
        <Title
          order={1}
          className="font-bold text-2xl font-heading capitalize my-2"
        >
          {data.title}
        </Title>
      </div>
      <Tiptap
        articleData={articleData}
        slug={params.slug}
        defaultContent={data.status === "beta" ? "" : article.body.html}
      />
    </main>
  );
}
