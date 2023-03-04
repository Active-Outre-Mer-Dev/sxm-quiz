import dynamic from "next/dynamic";
import Link from "next/link";
import { questions } from "@/quiz";
const Quiz = dynamic(() => import("@/app/quiz"), { ssr: false });

export default function Page({ params }: { params: { type: string } }) {
  const type = params.type === "general" ? questions : questions.filter(q => q.type === params.type);
  return (
    <main className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <Link href={"/"} className="text-secondary">
        Home
      </Link>
      <Quiz questions={type} />
    </main>
  );
}
