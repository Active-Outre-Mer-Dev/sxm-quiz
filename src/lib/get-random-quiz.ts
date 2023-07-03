export async function getRandomQuiz() {
  const res = await fetch("/api/random");
  const json = await res.json();
  return json.data as { slug: string };
}
