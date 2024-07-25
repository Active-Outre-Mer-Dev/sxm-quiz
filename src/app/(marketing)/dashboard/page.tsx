import { getUser } from "@/lib/data-fetch/get-user";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Page() {
  const { error, data } = await getUser();
  if (error) notFound();
  const { error: articleError, data: articleData } = await createClient()
    .from("articles")
    .select("slug")
    .eq("user_id", data.id);

  const articleCount = articleError ? 0 : articleData.length;
  return (
    <>
      <p>You have written {articleCount} articles</p>
    </>
  );
}
