import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
export const GET = async (req: Request) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response("bruh", { status: 200 });
  }
  const { data } = await supabase
    .from("related_quiz_articles")
    .select("*, articles ( slug, category )")
    .eq("quiz_id", parseInt(id));

  if (!data) return new Response("Bruh x2", { status: 200 });
  const articles = data.map(article => {
    return {
      title: article.article_slug.trim().replaceAll("-", " "),
      category: article.articles?.category || "",
      slug: article.article_slug
    };
  });

  return new Response(JSON.stringify({ data: articles }), { status: 200, headers });
};
