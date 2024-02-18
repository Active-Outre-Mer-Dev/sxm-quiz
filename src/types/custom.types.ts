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
