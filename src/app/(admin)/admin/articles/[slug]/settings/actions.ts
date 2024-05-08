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
  let newPath = "";
  const newData: Record<string, string> = { thumbnail_path: thumbnail_path || "" };

  if (schema.success) {
    if (!image) {
      const newImage = formData.get("image") as File;
      console.log(thumbnail_path);
      const { path, url } = await uploadImage(newImage, `articles/${schema.data.article_slug}`, {
        prevPath: thumbnail_path
      });
      thumbnail = url;
      newPath = path;
    } else {
      thumbnail = image;
    }
    Object.entries(schema.data).forEach(([entry, value]) => {
      const t = entry.replace("article_", "");
      newData[t] = value;
    });
    if (thumbnail) {
      newData.thumbnail = thumbnail;
    }
    if (newPath) {
      newData.thumbnail_path = newPath;
    }
    const { error } = await supabase.from("articles").update(newData).eq("slug", slug);

    if (!error) {
      redirect(`/admin/articles/${schema.data.article_slug}`);
    }
  } else {
    console.log(schema.error.flatten().fieldErrors);
  }
  return;
}
