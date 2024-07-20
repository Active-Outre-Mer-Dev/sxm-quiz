import { Title, Card, Badge, BadgeProps } from "@aomdev/ui";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { Filters } from "./quiz-filters";
import type { Categories, MultipleChoice, NameAll, Quiz, Search } from "@/types/custom.types";
import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Search;
};

const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export default async function Page({ searchParams }: PageProps) {
  const { data: multipleChoice, error } = await supabase
    .from("quiz")
    .select("*,  multiple_choice ( quiz_id ),  categories (*)")
    .eq("type", "multiple_choice")
    .eq("status", "published");
  const { data: nameAll, error: nameAllError } = await supabase
    .from("quiz")
    .select("*, quiz_name_all ( options ), categories (*)")
    .eq("type", "list")
    .eq("status", "published");
  const search = new URLSearchParams(searchParams);
  const topic = search.get("topic");
  if (error || nameAllError) return <p>No quizzes</p>;
  const allQuizzes = [...multipleChoice, ...nameAll];
  const filteredQuizzes = topic ? allQuizzes.filter(({ category }) => category === topic) : allQuizzes;
  return (
    <>
      <section
        id="quiz-section"
        className="w-11/12 lg:container   mx-auto mt-16 lg:mt-20 mb-20"
      >
        <Title
          order={1}
          className="capitalize mb-10 text-4xl lg:text-5xl font-heading font-medium"
        >
          {topic ? topic : "all"} Quizzes
        </Title>
        <Filters search={topic || undefined} />
        <div className="grid gap-4 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => {
            if ("multiple_choice" in quiz) {
              return (
                //@ts-ignore
                <QuizCard
                  key={quiz.id}
                  {...quiz}
                />
              );
            }
            if ("quiz_name_all" in quiz && quiz.type === "list") {
              const options = quiz.quiz_name_all as unknown as { options: string[] };
              return (
                //@ts-ignore
                <ListQuiz
                  key={quiz.id}
                  {...quiz}
                  quiz_name_all={options}
                />
              );
            }
          })}
        </div>
      </section>
    </>
  );
}

type MultiChoice = Pick<MultipleChoice, "quiz_id">;

type PropTypes = {
  list: Quiz & { quiz_name_all: Pick<NameAll, "options"> } & ({ categories: Categories } | null);
  mc: Quiz & { multiple_choice: MultiChoice[] } & ({ categories: Categories } | null);
};
function QuizCard(quiz: PropTypes["mc"]) {
  const scoreColor = "bg-neutral-200/30";
  return (
    <>
      <Card className="relative flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Title
              order={2}
              className="font-heading font-medium text-2xl"
            >
              {quiz.title}
            </Title>
            <div
              className={`font-heading font-medium text-lg rounded-full
           flex items-center justify-center h-10 w-10 ${scoreColor}`}
            >
              <span className="h-[1px] w-1/4 bg-neutral-600 dark:bg-neutral-200"></span>
            </div>
          </div>
        </div>

        <p className="mb-4">{quiz.description}</p>
        <div className="">
          <span className="text-sm text-gray-600  dark:text-gray-300 mb-4 flex items-center">
            <span className="inline-block mr-1">
              {quiz.multiple_choice.length} {quiz.multiple_choice.length > 1 ? "questions" : "question"} -{" "}
            </span>

            <Badge color={quiz.categories.color as BadgeProps["color"]}>{quiz.categories.title}</Badge>
          </span>
          <div className="flex gap-2">
            <Link
              className={buttonStyles({ size: "sm" })}
              href={`/quiz/${quiz.slug}`}
            >
              Take quiz
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}

function ListQuiz(quiz: PropTypes["list"]) {
  const scoreColor = "bg-neutral-200/30";
  return (
    <Card className="relative flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <Title
            order={2}
            className="font-heading font-medium text-2xl"
          >
            {quiz.title}
          </Title>
          <div
            className={`font-heading font-medium text-lg rounded-full
     flex items-center justify-center h-10 w-10 ${scoreColor}`}
          >
            <span className="h-[1px] w-1/4 bg-neutral-600 dark:bg-neutral-200"></span>
          </div>
        </div>
      </div>

      <p className="mb-4">{quiz.description}</p>
      <div className="">
        <span className="text-sm text-gray-600  dark:text-gray-300 mb-4 flex items-center">
          <span className="inline-block mr-1"> {quiz.quiz_name_all.options.length} options - </span>

          <Badge color={quiz.categories.color as BadgeProps["color"]}>{quiz.categories.title}</Badge>
        </span>
        <div className="flex gap-2">
          <Link
            className={buttonStyles({ size: "sm" })}
            href={`/quiz/${quiz.slug}`}
          >
            Take quiz
          </Link>
        </div>
      </div>
    </Card>
  );
}
