import { getUser } from "@/lib/get-user";
import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function Page() {
  const { error, data } = await getUser("server_component");
  if (error) notFound();
  const { error: articleError, data: articleData } = await createClient("server_component")
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
