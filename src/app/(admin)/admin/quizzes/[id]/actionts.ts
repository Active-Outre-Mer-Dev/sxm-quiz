"use server";
import { createClient } from "@/lib/supabase";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const QuestionSchema = z.object({
  answer: z.string(),
  question: z.string(),
  description: z.string()
});

export async function createQuestion(quiz_id: number, options: string[], formObject: FormData) {
  const supabase = createClient("server_action", true);
  const data = QuestionSchema.safeParse(Object.fromEntries(formObject));
  console.log(quiz_id);
  if (!data.success) {
    console.log(data.error);
    return data.error.format();
  } else {
    console.log(data.data);
    const { data: quizData } = data;
    const { error } = await supabase.from("multiple_choice").insert({
      answer: quizData.answer,
      description: quizData.description || "",
      options,
      question: quizData.question,
      quiz_id
    });
    console.log(error);
    revalidatePath(`/admin/quizzes/${quiz_id}`);
  }
}

export async function toggleStatus(id: number, status: boolean) {
  const supabase = createClient("server_action");
  await supabase
    .from("quiz")
    .update({ status: status ? "pending" : "published" })
    .eq("id", id);
}

export async function editQuestion(id: string, quiz_id: number, options: string[], formObject: FormData) {
  const supabase = createClient("server_action", true);
  const data = QuestionSchema.safeParse(Object.fromEntries(formObject));
  if (!data.success) {
    return data.error.format();
  } else {
    const { data: quizData } = data;
    await supabase
      .from("multiple_choice")
      .update({ ...quizData, options })
      .eq("id", id);
    revalidatePath(`/admin/quizzes/${quiz_id}`);
  }
}

export async function deleteQuestion(id: string, quiz_id: number) {
  "use server";
  const supabase = createClient("server_action", true);
  const { error } = await supabase.from("multiple_choice").delete().eq("id", id);
  console.log(error);
  console.log("it ran");
  revalidatePath(`/admin/quizzes/${quiz_id}`);
}
