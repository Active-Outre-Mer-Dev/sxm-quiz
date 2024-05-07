"use server";
import { z } from "zod";
import { github } from "@/lib/github-api";
import { categories } from "@/lib/categories";
import { createClient } from "@/lib/supabase";
import { createMarkdown } from "@/lib/create-markdown";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";

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
    const imageType = imageFile.type.replace("image/", "");
    const { data, error: imageError } = await supabase.storage
      .from("images")
      .upload(`articles/${schema.data.article_slug}-thumbnail`, imageFile, { upsert: true });

    if (imageError) {
      console.log(imageError);
      return;
    }
    const { data: imageURL } = supabase.storage.from("images").getPublicUrl(data.path);
    const { error } = await supabase.from("articles").insert({
      category: schema.data.article_category,
      slug: schema.data.article_slug,
      status: "beta",
      intro: schema.data.article_description,
      title: schema.data.article_title,
      thumbnail: imageURL.publicUrl,
      user_id: userData.id
    });

    if (error) {
      console.log(error);
      return;
    }

    const { branch, sha } = await github.createBranch(schema.data.article_title);
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
          thumbnail: imageURL.publicUrl,
          title: schema.data.article_title,
          profile: userData.profile_image || ""
        }
      )
    });
    redirect(`/admin/articles/${schema.data.article_slug}`);
  } else {
    return schema.error.flatten().fieldErrors;
  }
}
