"use server";
import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { createClient } from "@/lib/supabase";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export const editContent = async (content: string, slug: string) => {
  const client = createClient("server_action");
  const { error } = await client
    .from("articles")
    .update({ content: content, updated_at: new Date().toUTCString() })
    .eq("slug", slug);
  if (error) {
    return errorActionReturn({ inputErrors: null, message: error.message });
  }
  await client.from("article_history").insert({ article_slug: slug, content });
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

const StatusSchema = z.object({ article_slug: z.string(), article_status: z.enum(["published", "pending"]) });

export type StatusSchemaType = z.infer<typeof StatusSchema>;
type StatusSchemaState = ActionReturn<StatusSchemaType>;

export async function toggleArticleStatus(
  prevState: StatusSchemaState,
  formData: FormData
): Promise<StatusSchemaState> {
  const schema = StatusSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    const { error } = await createClient("server_action")
      .from("articles")
      .update({ status: schema.data.article_status })
      .eq("slug", schema.data.article_slug);
    if (error)
      return errorActionReturn({
        inputErrors: null,
        message: `Failed to ${schema.data.article_status === "published" ? "publish" : "draft"} article`
      });
    revalidatePath(`/admin/articles/${schema.data.article_slug}`);
    return successActionReturn(
      schema.data.article_status === "pending" ? "Article drafted" : "Article published"
    );
  } else {
    return errorActionReturn({ inputErrors: null, message: "An error occurred" });
  }
}

export async function deleteHistory(formData: FormData) {
  const slug = formData.get("slug")?.toString()!;

  const { error } = await createClient("server_action")
    .from("article_history")
    .delete()
    .eq("article_slug", slug);
  console.log(error);
}
