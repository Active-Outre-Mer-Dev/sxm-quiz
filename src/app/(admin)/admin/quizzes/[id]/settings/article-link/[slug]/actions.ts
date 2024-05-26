"use server";

import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ArticleLinkSchema = z.object({
  article_slug: z.string(),
  quiz_id: z.coerce.number()
});

export type ArticleLinkSchemaType = z.infer<typeof ArticleLinkSchema>;
type ArticleLinkSchemaReturn = ActionReturn<ArticleLinkSchemaType>;

export async function toggleLinkAction(
  isLinked: boolean,
  prevState: any,
  form: FormData
): Promise<ArticleLinkSchemaReturn> {
  "use server";
  const schema = ArticleLinkSchema.safeParse(Object.fromEntries(form));
  const client = createClient("server_action");
  if (schema.success) {
    if (isLinked) {
      const { error } = await client
        .from("related_quiz_articles")
        .delete()
        .eq("quiz_id", schema.data.quiz_id)
        .eq("article_slug", schema.data.article_slug);
      if (error) return errorActionReturn({ inputErrors: null, message: error.message });
      revalidatePath(`/admin/quizzes/${schema.data.quiz_id}`);
      return successActionReturn("Article unlinked");
    } else {
      const { error } = await client.from("related_quiz_articles").insert(schema.data);
      if (error) return errorActionReturn({ inputErrors: null, message: error.message });
      revalidatePath(`/admin/quizzes/${schema.data.quiz_id}`);
      return successActionReturn("Article linked");
    }
  } else {
    return errorActionReturn({ inputErrors: null, message: "An error occurred" });
  }
}
