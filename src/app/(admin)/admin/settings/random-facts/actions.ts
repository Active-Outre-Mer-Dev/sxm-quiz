"use server";
import { createClient } from "@/lib/supabase/server";
import { ActionReturn, errorActionReturn, successActionReturn } from "@/lib/action-return";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FactSchema = z.object({ description: z.string().optional(), file_facts: z.string().optional() });

export type FactSchemaType = z.infer<typeof FactSchema>;
type FactSchemaState = ActionReturn<FactSchemaType>;

export const addFact = async (prevState: FactSchemaState, formData: FormData): Promise<FactSchemaState> => {
  "use server";
  const schema = FactSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    let multiple = false;
    if (!schema.data.description && !schema.data.file_facts) {
      return errorActionReturn({
        message: "Must enter facts either through text field or by uploading a .txt file",
        inputErrors: null
      });
    }
    if (schema.data.description) {
      await createClient()
        .from("random_facts")
        .insert({ description: schema.data.description });
    }
    if (schema.data.file_facts) {
      const allFacts = schema.data.file_facts
        .split("@")
        .filter((fact) => fact)
        .map((fact) => ({ description: fact }));
      await createClient().from("random_facts").insert(allFacts);
      multiple = true;
    }
    revalidatePath("/admin/settings/random-facts");

    return successActionReturn(multiple ? "Facts added" : "Fact added");
  } else {
    return errorActionReturn({
      message: "An error occurred",
      inputErrors: null
    });
  }
};

const FactDeleteSchema = z.object({
  id: z.string()
});

export type FactDeleteSchemaType = z.infer<typeof FactDeleteSchema>;
type FactDeleteSchemaState = ActionReturn<FactDeleteSchemaType>;

export async function deleteFact(
  prevState: FactDeleteSchemaState,
  formData: FormData
): Promise<FactDeleteSchemaState> {
  const schema = FactDeleteSchema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    const { error } = await createClient()
      .from("random_facts")
      .delete()
      .eq("id", schema.data.id);
    if (error) {
      return errorActionReturn({ inputErrors: null, message: error.message });
    }
    revalidatePath("/admin/settings/random-facts");
    return successActionReturn("Fact deleted");
  } else {
    return errorActionReturn({
      inputErrors: schema.error.flatten().fieldErrors,
      message: "Failed to delete fact"
    });
  }
}

const FactUpdateScema = z.object({ id: z.string(), description: z.string() });

export type FactUpdateScema = z.infer<typeof FactUpdateScema>;
type FactUpdateScemaState = ActionReturn<FactUpdateScema>;

export async function updateFact(prevState: any, formData: FormData): Promise<FactUpdateScemaState> {
  const schema = FactUpdateScema.safeParse(Object.fromEntries(formData));
  if (schema.success) {
    const { error } = await createClient()
      .from("random_facts")
      .update({ description: schema.data.description })
      .eq("id", schema.data.id);
    if (error) {
      return errorActionReturn({ inputErrors: null, message: error.message });
    }
    revalidatePath("/admin/settings/random-facts");
    return successActionReturn("Fact updated");
  } else {
    console.log("bruh");
    return errorActionReturn({
      inputErrors: schema.error.flatten().fieldErrors,
      message: "Failed to update"
    });
  }
}
