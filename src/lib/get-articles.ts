import { createClient } from "./supabase";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";

export const getCachedArticles = nextCache(
  async () => {
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
  },
  ["articles"],
  { tags: ["all-articles"] }
);

export const getArticles = cache(async () => {
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
});

export const getArticle = cache(async (slug: string) => {
  const res = await createClient("server_component")
    .from("articles")
    .select("*, profiles (first_name, last_name, profile_image)")
    .eq("slug", slug)
    .single();
  return res;
});
