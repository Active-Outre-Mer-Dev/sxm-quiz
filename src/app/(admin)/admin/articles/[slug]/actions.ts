"use server";
import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const editContent = async (content: string, slug: string) => {
  await createClient("server_action")
    .from("articles")
    .update({ content: content, updated_at: new Date().toUTCString() })
    .eq("slug", slug);
  revalidatePath("/admin/articles");
};

export async function deleteArticle(slug: string, imgPath: string) {
  const supabase = createClient("server_action");
  await Promise.all([
    supabase.from("articles").delete().eq("slug", slug),
    supabase.storage.from("images").remove([imgPath])
  ]);
  revalidatePath(`/admin/articles`);
}
