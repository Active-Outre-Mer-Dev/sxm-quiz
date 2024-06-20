import { formatDate } from "@/lib/format-date";
import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) throw new Error("No slug");
  const { data, error } = await createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
    .from("article_history")
    .select("*")
    .eq("article_slug", slug)
    .order("created_at", { ascending: false });
  if (error) throw new Error("");
  const formattedData = data.map((articleHistory) => {
    const content = articleHistory.content.replace(/<[^>]*>/g, "").slice(0, 30);
    return {
      ...articleHistory,
      created_at: formatDate(new Date(articleHistory.created_at), { timeStyle: "short" }),
      content
    };
  });
  return Response.json({ data: formattedData });
};
