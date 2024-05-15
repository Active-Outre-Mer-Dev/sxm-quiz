"use server";
import { createClient } from "@/lib/supabase";
import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FactSchema = z.object({ description: z.string().optional(), file_facts: z.string().optional() });
export type FactSchemaType = z.infer<typeof FactSchema>;
export type FactSchemaState = ActionReturn<FactSchemaType>;

export const addFact = async (prevState: FactSchemaState, formData: FormData): Promise<FactSchemaState> => {
  "use server";
  const schema = FactSchema.safeParse(Object.fromEntries(formData));

  if (schema.success) {
    if (!schema.data.description && !schema.data.file_facts) {
      return errorActionReturn({
        message: "Must enter facts either through text field or by uploading a .txt file",
        inputErrors: null
      });
    }
    if (schema.data.description) {
      await createClient("server_action")
        .from("random_facts")
        .insert({ description: schema.data.description });
    }
    if (schema.data.file_facts) {
      const allFacts = schema.data.file_facts
        .split("@")
        .filter((fact) => fact)
        .map((fact) => ({ description: fact }));
      await createClient("server_action").from("random_facts").insert(allFacts);
    }
    revalidatePath("/admin/settings/random-facts");

    return successActionReturn("Fact added");
  } else {
    return errorActionReturn({
      message: "An error occurred",
      inputErrors: null
    });
  }
};
