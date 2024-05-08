import { Title } from "@aomdev/ui";
import { ArticleForm } from "./_client/article-form";
import { createClient } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";

export default async function ArticleSettings({ params }: { params: { slug: string } }) {
  unstable_noStore();
  const { data, error } = await createClient("server_component")
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single();
  if (error) throw new Error("Bruh");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title
          order={1}
          className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight "
        >
          Update Article
        </Title>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ArticleForm article={data} />
      </div>
    </div>
  );
}
