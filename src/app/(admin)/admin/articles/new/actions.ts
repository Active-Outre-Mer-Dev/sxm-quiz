"use server";
import { z } from "zod";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";
import { uploadImage } from "@/lib/upload-image";

const ArticleSchema = z.object({
  article_title: z.string().trim().min(1, { message: "Title is required" }),
  article_description: z.string({ required_error: "Description is required" }),
  article_category: z.enum(categories),
  article_slug: z.string({ required_error: "Missing Slug" }).min(1, { message: "Slug is required" })
});

export async function createArticle(previousState: any, formData: FormData) {
  const formEntries = Object.fromEntries(formData);
  const schema = ArticleSchema.safeParse(formEntries);
  const supabase = createClient("server_action");

  if (schema.success) {
    const { error: userError, data } = await getUser("server_action");
    if (userError) {
      return;
    }
    const imageFile = formEntries.image as File;
    const { url, path } = await uploadImage(imageFile, `articles/${schema.data.article_slug}`);

    const { error } = await supabase.from("articles").insert({
      category: schema.data.article_category,
      slug: schema.data.article_slug,
      status: "beta",
      intro: schema.data.article_description,
      title: schema.data.article_title,
      thumbnail: url,
      user_id: data.id,
      thumbnail_path: path
    });
    if (error) {
      console.log(error);
      return;
    }
    redirect(`/admin/articles/${schema.data.article_slug}`);
  } else {
    return schema.error.flatten().fieldErrors;
  }
}
