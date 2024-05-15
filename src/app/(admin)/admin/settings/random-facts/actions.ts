"use server";
import { createClient } from "@/lib/supabase";
import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FactSchema = z.object({ description: z.string() });
export type FactSchemaType = z.infer<typeof FactSchema>;
export type FactSchemaState = ActionReturn<FactSchemaType>;

export const addFact = async (prevState: FactSchemaState, formData: FormData): Promise<FactSchemaState> => {
  "use server";
  const schema = FactSchema.safeParse(Object.fromEntries(formData));
  console.log("bruh");
  if (schema.success) {
    await createClient("server_action").from("random_facts").insert(schema.data);
    revalidatePath("/admin/settings/random-facts");

    return successActionReturn("Fact added");
  } else {
    return errorActionReturn({
      message: "An error occurred",
      inputErrors: null
    });
  }
};
