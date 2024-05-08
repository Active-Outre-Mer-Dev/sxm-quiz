import { unstable_cache } from "next/cache";
import { createClient } from "./supabase";

export const getCachedArticles = unstable_cache(async () => {
  const { data, error } = await createClient("server_component")
    .from("articles")
    .select("*")
    .neq("status", "in_review");
  if (error) {
    return {
      error,
      data: null
    };
  } else {
    return {
      error: null,
      data
    };
  }
}, ["articles"]);

export async function getArticles() {
  const { data, error } = await createClient("server_component")
    .from("articles")
    .select("*")
    .neq("status", "in_review");
  if (error) {
    return {
      error,
      data: null
    };
  } else {
    return {
      error: null,
      data
    };
  }
}
