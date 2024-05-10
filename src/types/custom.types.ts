import { Database } from "./database.types";

export type ArticleProps = {
  title: string;
  thumbnail: string;
  intro: string;
  category: string;
  author: string;
  profile: string | undefined;
  created_at: string;
  slug: string;
  featured: boolean;
  community: boolean;
  views: number;
};

export type MultipleChoice = Database["public"]["Tables"]["multiple_choice"]["Row"];
export type Quiz = Database["public"]["Tables"]["quiz"]["Row"];
export type NameAll = Database["public"]["Tables"]["quiz_name_all"]["Row"];
export type Search = string | string[][] | Record<string, string> | URLSearchParams | undefined;
export type Categories = Database["public"]["Tables"]["categories"]["Row"];

export type QuizCat = Quiz & { categories: Categories | null };
export type User = Database["public"]["Tables"]["profiles"]["Row"];
export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
