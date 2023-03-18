import dynamic from "next/dynamic";
import { questions } from "@/quiz";
const Quiz = dynamic(() => import("@/app/quiz"), { ssr: false });

export default function Page({ params }: { params: { type: string } }) {
  const type = params.type === "general" ? questions : questions.filter(q => q.type === params.type);
  return (
    <main className="flex flex-col gap-4 items-center">
      <Quiz questions={type} type={params.type} />
    </main>
  );
}
