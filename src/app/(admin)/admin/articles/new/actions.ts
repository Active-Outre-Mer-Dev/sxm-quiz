"use server";
import { z } from "zod";
import { github } from "@/lib/github-api";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase";
import { createMarkdown } from "@/lib/create-markdown";
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
    const { error: userError, userData } = await getUser("server_action");
    if (userError) {
      return;
    }
    const imageFile = formEntries.image as File;
    const { url, path } = await uploadImage(imageFile, `articles/${schema.data.article_slug}`);

    const { branch, sha } = await github.createBranch(schema.data.article_slug);
    await github.createFile({
      branch,
      sha,
      commitMessage: `Create ${schema.data.article_title}`,
      slug: schema.data.article_slug,
      content: createMarkdown(
        {},
        {
          author: `${userData.first_name} ${userData.last_name}`,
          category: schema.data.article_category,
          intro: schema.data.article_description,
          thumbnail: url,
          title: schema.data.article_title,
          profile: userData.profile_image || ""
        }
      )
    });
    const { error } = await supabase.from("articles").insert({
      category: schema.data.article_category,
      slug: schema.data.article_slug,
      status: "beta",
      intro: schema.data.article_description,
      title: schema.data.article_title,
      thumbnail: url,
      user_id: userData.id,
      thumbnail_path: path,
      branch
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
