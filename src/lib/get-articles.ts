import { createClient } from "./supabase";
import { cache } from "react";

export const getCachedArticles = async () => {
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
};

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
