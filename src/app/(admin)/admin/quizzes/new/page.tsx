import { Textarea, Title, Button } from "@aomdev/ui";
import { Select } from "./client";
import { Radio } from "./quiz-type";
import { QuizTitle } from "./quiz-title";
import { createClient } from "@/lib/supabase";
import { z } from "zod";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  quiz_title: z.string().min(3),
  quiz_slug: z.string().min(3),
  quiz_description: z.string().min(10),
  quiz_category: z.enum(["history", "geography", "economy", "environment"]),
  quiz_type: z.enum(["multiple_choice", "list"])
});

export default function Page() {
  const createQuiz = async (formData: FormData) => {
    "use server";
    const supabase = createClient("server_action", true);
    const form = Object.fromEntries(formData);

    const status = FormSchema.safeParse(form);
    console.log(status.success);

    if (!status.success) {
      console.log(status.error.errors);
      return status.error.errors;
    }
    const { data } = status;
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
    console.log(error, quizData, ";wtf");
    console.log(error, quizData);
    if (error || !quizData) return;
    redirect(`/admin/quizzes/${quizData.id}`);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title
            order={1}
            className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight "
          >
            Create new quiz
          </Title>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action={createQuiz}
          >
            <QuizTitle />
            <Textarea
              label="Description"
              name="quiz_description"
            />
            <Select
              name="quiz_category"
              fullWidth
              items={[
                { label: "History", value: "history" },
                { label: "Geography", value: "geography" },
                { label: "Economy", value: "economy" },
                { label: "Environment", value: "environment" }
              ]}
            />
            <Radio />

            <Button
              type="submit"
              fullWidth
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
