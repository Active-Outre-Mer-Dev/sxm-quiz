import { createClient } from "@/lib/supabase";
import { Card, Title, ActionIcon, Button, TextInput } from "@aomdev/ui";
import { redirect } from "next/navigation";
import { Trash, Trash2 } from "lucide-react";
import { NewQuestion } from "./new-question";
import { EditQuestionDialog } from "./edit-question";
import { deleteQuestion, toggleStatus } from "./actions";
import { Nav } from "@/app/(admin)/_components/nav";
import { QuizOptions } from "./quiz-options";

async function fetchQuestions(
  type: "multiple_choice" | "list",
  quizId: number,
  client: ReturnType<typeof createClient>
) {
  if (type === "list") {
    return client.from("quiz_name_all").select("*").eq("quiz_id", quizId).single();
  } else {
    return client.from("multiple_choice").select("*").eq("quiz_id", quizId);
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient("server_component");
  const { error, data } = await supabase
    .from("quiz")
    .select("*, scores (quiz_id, score)")
    .eq("id", Number(params.id))
    .single();
  if (error) redirect("/");
  const { data: questionData, error: questionError } = await fetchQuestions(data.type, data.id, supabase);
  if (questionError) return;
  const average = Math.round(data.scores.reduce((a, c) => a + c.score, 0) / data.scores.length);
  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center border-b justify-between border-b-neutral-700 mb-16">
          <Title
            order={1}
            className="font-bold text-4xl font-heading capitalize my-10"
          >
            {data.title}
          </Title>
        </div>
        <div className="flex gap-4">
          <Card className="basis-1/3 space-y-4">
            <p className="font-medium text-xl">Completions</p>
            <span className="font-semibold text-4xl font-heading">{data.completions}</span>
          </Card>
          <Card className="basis-1/3">
            <p className="font-medium text-xl">Average</p>
            <span className="font-semibold text-4xl font-heading">{average || 0}%</span>
          </Card>
        </div>
        <section className="mt-16">
          {"options" in questionData ? (
            <>
              <QuizOptions {...questionData} />
            </>
          ) : (
            <QuestionList
              quiz_id={data.id}
              questions={questionData}
            />
          )}
        </section>
      </div>
    </>
  );
}

type PropTypes = {
  questions: {
    answer: string;
    description: string;
    id: string;
    options: string[];
    question: string;
    quiz_id: number;
  }[];
  quiz_id: number;
};

function QuestionList(props: PropTypes) {
  return (
    <>
      <div className="flex items-center justify-between mb-10 ">
        <Title
          order={2}
          className="font-heading font-semibold text-3xl "
        >
          Questions <span>({props.questions.length})</span>
        </Title>
        <NewQuestion quiz_id={props.quiz_id}>
          <Button>Add question</Button>
        </NewQuestion>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-20">
        {props.questions.map((question) => {
          return (
            <Card
              key={question.id}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium ">{question.question}</p>
                <div className="flex items-center gap-4">
                  <EditQuestionDialog question={question} />
                  <form action={deleteQuestion.bind(null, question.id, question.quiz_id)}>
                    <ActionIcon color="error">
                      <Trash size={"50%"} />
                    </ActionIcon>
                  </form>
                </div>
              </div>
              <p className="text-lg">{question.answer}</p>
              <p className="text-gray-200">{question.description}</p>
              <ul className="list-disc list-inside">
                {question.options.map((option) => {
                  return <li key={option}>{option}</li>;
                })}
              </ul>
            </Card>
          );
        })}
      </div>
    </>
  );
}
