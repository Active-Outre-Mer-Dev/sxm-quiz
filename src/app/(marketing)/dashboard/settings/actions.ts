"use server";
import { z } from "zod";
import { getUser } from "@/lib/get-user";
import { createClient } from "@/lib/supabase";
import type { ActionReturn } from "@/lib/action-return";

const PasswordSchema = z.object({
  new_password: z.string(),
  confirm_password: z.string()
});

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
export type UpdatePasswordState = ActionReturn<PasswordSchemaType>;

export const updatePassword = async (
  prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> => {
  const { error, message } = await getUser("server_action");
  console.log("bruh");
  if (error)
    return {
      status: "error",
      message,
      inputErrors: null,
      submitId: crypto.randomUUID()
    };

  const schema = PasswordSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    if (schema.data.confirm_password !== schema.data.new_password) {
      return {
        status: "error",
        message: "Passwords do not match",
        inputErrors: null,
        submitId: crypto.randomUUID()
      };
    }
    const { error } = await createClient("server_action").auth.updateUser({
      password: schema.data.new_password
    });
    if (error) {
      return {
        status: "error",
        message: error.message,
        inputErrors: null,
        submitId: crypto.randomUUID()
      };
    }
    return {
      status: "success",
      message: "Password updated successfully",
      inputErrors: null,
      submitId: crypto.randomUUID()
    };
  } else {
    return {
      status: "error",
      inputErrors: schema.error.flatten().fieldErrors,
      message: "There was an error processing the data you provided",
      submitId: crypto.randomUUID()
    };
  }
};
