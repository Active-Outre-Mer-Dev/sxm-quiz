"use server";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase";
import { z } from "zod";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/upload-image";

const ArticleSchema = z.object({
  article_title: z.string().trim().min(1, { message: "Title is required" }).optional(),
  article_intro: z.string({ required_error: "Description is required" }).optional(),
  article_category: z.enum(categories).optional(),
  article_slug: z.string({ required_error: "Missing Slug" }).min(1, { message: "Slug is required" })
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
    const { path, url } = await uploadImage(newImage, `articles/${slug}`, {
      prevPath: thumbnail_path
    });
    thumbnail = url;
    thumbnail_path = path;
  } else {
    thumbnail = image;
  }
  const newData: Record<string, string> = { thumbnail, thumbnail_path: thumbnail_path || "" };

  if (schema.success) {
    Object.entries(schema.data).forEach(([entry, value]) => {
      const t = entry.replace("article_", "");
      newData[t] = value;
    });

    const { error } = await supabase.from("articles").update(newData).eq("slug", slug);

    if (!error) {
      redirect(`/admin/articles/${schema.data.article_slug}/settings`);
    }
  } else {
    console.log(schema.error.flatten().fieldErrors);
  }
  return;
}
