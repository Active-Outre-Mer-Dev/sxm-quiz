import { createClient } from "./supabase/server";
import { unstable_cache as cache } from "next/cache";

async function fetchCategories() {
  const { data, error } = await createClient().from("categories").select("*");
  if (error) throw error;
  return data;
}

export const cachedCategories = cache(async () => fetchCategories(), ["categories"]);
