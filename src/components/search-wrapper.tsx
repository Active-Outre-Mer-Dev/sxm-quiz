import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { Searchbar } from "./searchbar";
import { allArticles } from "contentlayer/generated";
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function SearchWrapper() {
  const { data, error } = await supabase.from("quiz").select("*");
  if (error) throw new Error("Failed to retrieve articles");
  const multipleChoice = data.filter(quiz => quiz.type === "multiple_choice");
  const nameAll = data.filter(quiz => quiz.type === "list");
  return <Searchbar articles={allArticles} multipleChoice={multipleChoice} nameAll={nameAll} />;
}
