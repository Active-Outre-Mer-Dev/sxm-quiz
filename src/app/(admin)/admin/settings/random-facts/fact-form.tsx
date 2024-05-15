"use client";
import { FactSchemaType, addFact } from "./actions";
import { Button, Textarea } from "@aomdev/ui";
import { useActionState } from "@/lib/hooks/use-action-state";
import { FileText } from "lucide-react";

export function FactForm() {
  const { ref, formAction } = useActionState<FactSchemaType>(addFact, {
    resetOnSuccess: true,
    onSuccess(message) {
      alert(message);
    }
  });

  return (
    <form
      ref={ref}
      action={formAction}
      className="space-y-4 mb-10"
    >
      <Textarea
        label="New fact"
        name="description"
      />
      <div className="flex gap-4">
        <Button>Submit</Button>
        <Button
          variant={"neutral"}
          type="button"
        >
          <FileText
            size={16}
            className="inline-block mr-2"
          />
          Import from csv
        </Button>
      </div>
    </form>
  );
}
