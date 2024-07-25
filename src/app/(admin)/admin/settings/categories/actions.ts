"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCategory = async (formData: FormData) => {
  const title = formData.get("category")?.toString() || "";
  const color = formData.get("color")?.toString();
  if (!color || !title) throw new Error("Bruh");
  const { error } = await createClient().from("categories").insert({ title, color });
  if (error) throw new Error("Bruhx2");
  redirect("/admin/settings/categories");
};

export const deleteCategory = async (id: string) => {
  if (!id) throw new Error("Bruh");
  console.log("wtf", id);
  const { error } = await createClient().from("categories").delete().eq("id", id);
  if (error) throw new Error("Bruhx2");
  console.log(error);
  revalidatePath("/admin/settings/categories");
};
