"use server";
import { errorActionReturn, successActionReturn } from "@/lib/action-return";
import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const editContent = async (content: string, slug: string) => {
  const { error } = await createClient("server_action")
    .from("articles")
    .update({ content: content, updated_at: new Date().toUTCString() })
    .eq("slug", slug);
  if (error) {
    return errorActionReturn({ inputErrors: null, message: error.message });
  }
  revalidatePath("/admin/articles");
  return successActionReturn("Content updated");
};

export async function deleteArticle(slug: string, imgPath: string) {
  const supabase = createClient("server_action");
  const [{ error: articleError }, { error: imageError }] = await Promise.all([
    supabase.from("articles").delete().eq("slug", slug),
    supabase.storage.from("images").remove([imgPath])
  ]);
  if (articleError || imageError) {
    return errorActionReturn({ inputErrors: null, message: "Failed to delete article" });
  } else {
    revalidatePath(`/admin/articles`);
    return successActionReturn("Article deleted");
  }
}
