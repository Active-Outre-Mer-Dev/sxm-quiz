"use server";

import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { getUser } from "@/lib/get-user";
import { createClient } from "@/lib/supabase";
import { uploadImage } from "@/lib/upload-image";
import { z } from "zod";

const UserSchema = z.object({
  first_name: z.string().min(1, { message: "Must provide a first name" }),
  last_name: z.string().min(1, { message: "Must provide a last name" })
});

export type UserSchemaType = z.infer<typeof UserSchema>;
type UserSchemaState = ActionReturn<UserSchemaType>;

export async function updateUser(prevState: any, formData: FormData): Promise<UserSchemaState> {
  "use server";
  const { data, error } = await getUser("server_action");
  if (error) return errorActionReturn({ inputErrors: null, message: "User error" });
  const schema = UserSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    let profile = "";
    let profilePath = "";

    const image = formData.get("default_image")?.toString();
    if (!image) {
      const newImage = formData.get("image") as File;
      const { path, url } = await uploadImage(newImage, `users/${data.id}`);
      profile = url;
      profilePath = path;
    } else {
      profile = image;
    }
    const newData: Record<string, string> = {
      ...schema.data
    };
    if (profile) {
      newData.profile_image = profile;
    }
    if (profilePath) {
      newData.profile_path = profilePath;
    }
    await createClient("server_action").from("profiles").update(newData).eq("id", data.id);
    return successActionReturn("Profile updated");
  } else {
    return errorActionReturn({
      inputErrors: schema.error.flatten().fieldErrors,
      message: "Something went wrong"
    });
  }
}
