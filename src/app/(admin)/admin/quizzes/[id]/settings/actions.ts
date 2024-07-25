"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const QuestionSchema = z.object({
  title: z.string(),
  description: z.string().min(6),
  slug: z.string(),
  category: z.string()
});

export const updateQuiz = async (id: number, formData: FormData) => {
  const client = createClient();
  const data = QuestionSchema.safeParse(Object.fromEntries(formData));
  const status = formData.get("status")?.toString();

  if (!data.success) {
    return data.error.format();
  }
  const { data: quizData } = data;
  const { error } = await client
    .from("quiz")
    .update({ ...quizData, status: status === "on" ? "published" : "pending" })
    .eq("id", id);
  if (error) throw error;
};

export const deleteQuiz = async (id: number) => {
  const client = createClient();
  await client.from("quiz").delete().eq("id", id);
  revalidatePath("/admin/quizzes");
  redirect("/admin/quizzes");
};
