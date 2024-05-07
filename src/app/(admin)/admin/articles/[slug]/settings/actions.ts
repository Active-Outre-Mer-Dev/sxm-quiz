"use server";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase";
import { z } from "zod";
import { redirect } from "next/navigation";

const ArticleSchema = z.object({
  article_title: z.string().trim().min(1, { message: "Title is required" }).optional(),
  article_intro: z.string({ required_error: "Description is required" }).optional(),
  article_category: z.enum(categories).optional(),
  article_slug: z
    .string({ required_error: "Missing Slug" })
    .min(1, { message: "Slug is required" })
    .optional()
});

export async function editArticle(
  slug: string,
  thumbnail_path: string | null,
  previousState: any,
  formData: FormData
) {
  const supabase = createClient("server_action");
  const schema = ArticleSchema.safeParse(Object.fromEntries(formData));
  const image = formData.get("default_image")?.toString();
  let thumbnail = "";

  if (!image) {
    const newImage = formData.get("image") as File;
    if (thumbnail_path) {
      await supabase.storage.from("images").remove([thumbnail_path]);
    }
    const uid = `thumbnail:${crypto.randomUUID().replaceAll("-", "")}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`articles/${slug}-${uid}`, newImage, { upsert: true });
    if (error) throw error;
    const { data: imgData } = supabase.storage.from("images").getPublicUrl(data.path);
    thumbnail = imgData.publicUrl;
    thumbnail_path = data.path;
  } else {
    thumbnail = image;
  }
  const newData: Record<string, string> = { thumbnail, thumbnail_path: thumbnail_path || "" };
  if (schema.success) {
    Object.entries(schema.data).forEach(([entry, value]) => {
      const t = entry.replace("article_", "");
      newData[t] = value;
    });

    const { error } = await createClient("server_action").from("articles").update(newData).eq("slug", slug);
    if (!error) {
      redirect(`/admin/articles/${schema.data.article_slug}/settings`);
    }
  } else {
    console.log(schema.error.flatten().fieldErrors);
  }
  return;
}
