"use server";
import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { getHistory } from "@/lib/get-history";
import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const editContent = async (content: string, slug: string) => {
  const client = createClient("server_action");
  const { data } = await client
    .from("article_history")
    .insert({ article_slug: slug, content }).select().single();
  const { error } = await client
    .from("articles")
    .update({ content: content, updated_at: new Date().toUTCString(), active_history_id: data?.id })
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

  await createClient("server_action")
    .from("article_history")
    .delete()
    .eq("article_slug", slug);
}

const RestoreHistorySchema = z.object({
  article_slug: z.string(),
  history_id: z.string()
});

export type RestoreHistorySchemaType = z.infer<typeof RestoreHistorySchema>;
type RestoreHistoryState = ActionReturn<RestoreHistorySchemaType>;

export async function restoreHistory(prevState: any, formData: FormData): Promise<RestoreHistoryState> {
  const schema = RestoreHistorySchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    const supabase = createClient("server_action");

    const { status, data } = await getHistory(schema.data.history_id);
    if (status === "success") {

      const { error } = await supabase
        .from("articles")
        .update({ content: data.content, active_history_id: schema.data.history_id })
        .eq("slug", schema.data.article_slug);

      if (error) return errorActionReturn({ inputErrors: null, message: error.message });
    } else {
      return errorActionReturn({ inputErrors: null, message: "Failed to restore history" });
    }
    revalidatePath(`/admin/articles/${schema.data.article_slug}`);
    return successActionReturn("History restored");
  } else {
    return errorActionReturn({
      inputErrors: schema.error.flatten().fieldErrors,
      message: "Failed to restore history"
    });
  }
}

