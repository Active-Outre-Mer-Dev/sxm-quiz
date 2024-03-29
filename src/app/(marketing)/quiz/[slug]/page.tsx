import { randomize } from "@/randomize-quiz";
import { Container } from "./_components/container";
import { Suspense, lazy } from "react";
import { Database } from "@/types/database.types";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
const Quiz = lazy(() => import("./_components/question-quiz"));
const ListQuiz = lazy(() => import("./_components/list-quiz"));

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
type SupabaseClient = typeof supabase;
type PageProps = {
  params: { slug: string };
};

async function s(supabase: SupabaseClient, id: number, type: "multiple_choice" | "list" | null) {
  switch (type) {
    case "multiple_choice":
      return supabase.from("multiple_choice").select("*").eq("quiz_id", id);

    case "list": {
      return supabase.from("quiz_name_all").select("*").eq("quiz_id", id).single();
    }
    default:
      notFound();
      break;
  }
}

export default async function Page({ params }: PageProps) {
  const { data: quizData, error: quizError } = await supabase
    .from("quiz")
    .select("*, scores (quiz_id, score), categories (title)")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (quizError) notFound();

  const { data } = await s(supabase, quizData?.id, quizData.type);

  const average = Array.isArray(quizData.scores)
    ? Math.round(quizData.scores.reduce((a, c) => a + c.score, 0) / quizData.scores.length)
    : 0;

  const update = async () => {
    "use server";
    revalidatePath(`/quiz/${params.slug}`);
  };
  if (!data) notFound();
  return (
    <main
      style={{ minHeight: "calc(100vh - 64px - 80px)" }}
      className="flex gap-5 w-11/12 lg:w-4/5 mx-auto mt-5 mb-16 lg:mb-36"
    >
      <Container
        id={quizData.id}
        update={update ?? 0}
        average={Number.isInteger(average) ? average : 0}
        category={quizData.categories?.title || ""}
        questionCount={Array.isArray(data) ? data.length : data.options.length}
        description={quizData.description}
        count={quizData.completions}
        title={quizData.title}
        type={quizData.type}
      >
        <Suspense fallback={<p>Loading quiz...</p>}>
          {"options" in data && (
            <ListQuiz
              options={data.options}
              task={data.task}
            />
          )}
          {Array.isArray(data) && (
            <Quiz
              questions={data.map((question) => ({
                ...question,
                options: randomize([...question.options, question.answer])
              }))}
            />
          )}
        </Suspense>
      </Container>
    </main>
  );
}
