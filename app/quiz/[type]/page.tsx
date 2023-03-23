import dynamic from "next/dynamic";
import { questions } from "@/quiz";
const Quiz = dynamic(() => import("@/app/quiz"), { ssr: false });

export default function Page({
  params,
  searchParams
}: {
  params: { type: string };
  searchParams?: { [key: string]: string | string[][] | undefined };
}) {
  const type =
    params.type === "general"
      ? questions
      : questions.filter(q => q.type === params.type && q.difficulty === searchParams?.difficulty);
  const search = new URLSearchParams();
  const q = type.filter(question => question.difficulty === searchParams?.difficulty);
  console.log(search);
  console.log(searchParams);
  return (
    <main className="flex flex-col gap-4 items-center">
      <Quiz questions={q} type={params.type} />
    </main>
  );
}
