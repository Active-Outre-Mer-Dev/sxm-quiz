import dynamic from "next/dynamic";
import { questions } from "@/quiz";
const Quiz = dynamic(() => import("@/app/quiz"), { ssr: false });

type Search = string | URLSearchParams | Record<string, string> | string[][] | undefined;

export default function Page({ params, searchParams }: { params: { type: string }; searchParams?: Search }) {
  const type = params.type === "general" ? questions : questions.filter(q => q.type === params.type);
  const search = new URLSearchParams(searchParams);
  const difficulty = search.get("difficulty");
  const q = difficulty ? type.filter(question => question.difficulty === search.get("difficulty")) : type;
  return (
    <main className="flex flex-col gap-4 items-center">
      <Quiz questions={q} type={params.type} />
    </main>
  );
}
