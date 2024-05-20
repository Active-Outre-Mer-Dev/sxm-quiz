"use server";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  quiz_title: z.string().min(3),
  quiz_slug: z.string().min(3),
  quiz_description: z.string().min(10),
  quiz_category: z.string(),
  quiz_type: z.enum(["multiple_choice", "list"]),
  quiz_task: z.string().optional()
});

export const createQuiz = async (formData: FormData) => {
  const supabase = createClient("server_action", true);
  const form = Object.fromEntries(formData);

  const schema = FormSchema.safeParse(form);
  console.log(schema.success);

  if (!schema.success) {
    console.log(schema.error.errors);
    return schema.error.errors;
  }
  const { data } = schema;
  const { error, data: quizData } = await supabase
    .from("quiz")
    .insert({
      title: data.quiz_title,
      category: data.quiz_category,
      description: data.quiz_description,
      slug: data.quiz_slug,
      type: data.quiz_type
    })
    .select()
    .single();
  if (schema.data.quiz_type === "list" && !error && schema.data.quiz_task) {
    await supabase
      .from("quiz_name_all")
      .insert({ quiz_id: quizData.id, task: schema.data.quiz_task, options: [] });
  }
  if (error || !quizData) return;
  redirect(`/admin/quizzes/${quizData.id}`);
};
