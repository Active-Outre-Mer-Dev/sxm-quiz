"use client";
import { getRandomQuiz } from "@/lib/get-random-quiz";
import { useRouter } from "next/navigation";
import { Button } from ".";

export function GetStarted() {
  const router = useRouter();
  return (
    <Button
      // size={"lg"}
      onClick={async e => {
        e.preventDefault();
        const quiz = await getRandomQuiz();
        router.push(`/quiz/${quiz.slug}`);
      }}
    >
      Start quiz
    </Button>
  );
}
