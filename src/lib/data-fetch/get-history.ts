import { createClient } from "../supabase/server";

export async function getHistory(id: string) {
  const { data, error } = await createClient()
    .from("article_history")
    .select("content")
    .eq("id", id)
    .single();
  if (error) {
    return { status: "error", message: error.message, data: null } as const;
  } else {
    return {
      status: "success",
      data
    } as const;
  }
}
