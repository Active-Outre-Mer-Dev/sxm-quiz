import { Title, Card, Badge } from "@aomdev/ui";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { DetailsWrapper } from "@/components/quiz/details-modals";
import { Filters } from "./quiz-filters";
import { cookies } from "next/headers";
import { Database, MultipleChoice, NameAll, Quiz } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Search = string | string[][] | Record<string, string> | URLSearchParams | undefined;

type PageProps = {
  searchParams: Search;
};

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function Page({ searchParams }: PageProps) {
  const { data: multipleChoice, error } = await supabase
    .from("quiz")
    .select("*,  quiz_multiple_choice ( quiz_id )")
    .eq("type", "multiple_choice");
  const { data: nameAll, error: nameAllError } = await supabase
    .from("quiz")
    .select("*, quiz_name_all (quiz_id, options)")
    .eq("type", "list");
  const search = new URLSearchParams(searchParams);
  const topic = search.get("topic");
  if (error || nameAllError) return <p>No quizzes</p>;

  const allQuizzes = [...multipleChoice, ...nameAll];
  const filteredQuizzes = topic ? allQuizzes.filter(({ category }) => category === topic) : allQuizzes;

  return (
    <>
      <section id="quiz-section" className="w-11/12 lg:container   mx-auto mt-16 lg:mt-20 mb-20">
        <Title order={1} className="capitalize mb-10 text-4xl lg:text-5xl font-heading font-medium">
          {topic ? topic : "all"} Quizzes
        </Title>
        <Filters search={topic || undefined} />
        <div className="grid gap-4 lg:grid-cols-3">
          {filteredQuizzes.map(quiz => {
            return <QuizCard quiz={quiz} key={quiz.id} />;
          })}
        </div>
      </section>
    </>
  );
}

type PropTypes = {
  quiz: Quiz &
    (
      | { quiz_multiple_choice: Pick<MultipleChoice, "quiz_id">[] }
      | { quiz_name_all: Pick<NameAll, "quiz_id" | "options">[] }
    );
};

function QuizCard({ quiz }: PropTypes) {
  const color =
    quiz.category === "economy"
      ? "primary"
      : quiz.category === "geography"
      ? "secondary"
      : quiz.category === "history"
      ? "error"
      : quiz.category === "environment"
      ? "success"
      : "tertiary";

  const scoreColor = "bg-neutral-200/30";
  const isQuestionBased = "quiz_multiple_choice" in quiz;
  return (
    <>
      <Card className="relative flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Title order={2} className="font-heading font-medium text-2xl">
              {quiz.title}
            </Title>
            <div
              className={`font-heading font-medium text-lg rounded-full
           flex items-center justify-center h-10 w-10 ${scoreColor}`}
            >
              <span className="h-[1px] w-1/4 bg-neutral-600"></span>
            </div>
          </div>
        </div>

        <p className="mb-4">{quiz.description}</p>
        <div className="">
          <span className="text-sm text-gray-600  mb-4 flex items-center">
            {isQuestionBased ? (
              <>
                {quiz.quiz_multiple_choice.length}{" "}
                {quiz.quiz_multiple_choice.length > 1 ? "questions" : "question"} -{" "}
              </>
            ) : (
              <> options - </>
            )}
            <Badge color={color}>{quiz.category}</Badge>
          </span>
          <div className="flex gap-2">
            <Link className={buttonStyles({ size: "sm" })} href={`/quiz/${quiz.slug}`}>
              Take quiz
            </Link>
            <DetailsWrapper badgeColor={color} {...quiz} />
          </div>
        </div>
      </Card>
    </>
  );
}
