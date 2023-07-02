import { allQuizzes } from "@/quizzes";

export async function getRandomQuiz() {
  const res = await fetch("/api/random");
  const json = await res.json();
  return json.data as typeof allQuizzes.all[0];
}
