"use client";
import { addFact } from "./actions";
import { Button, Textarea, Tooltip, Alert } from "@aomdev/ui";
import { useActionState } from "@/lib/hooks/use-action-state";
import { FileText } from "lucide-react";
import { startTransition, useRef, useState } from "react";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { toast } from "sonner";
import type { FormEvent } from "react";
import type { FactSchemaType } from "./actions";
import type { RandomFact } from "@/types/custom.types";

type PropTypes = {
  addOptimisticFact: (fact: RandomFact) => void;
};

export function FactForm({ addOptimisticFact }: PropTypes) {
  const { ref, formAction, state } = useActionState<FactSchemaType>(addFact, {
    resetOnSuccess: true,
    onSuccess(message) {
      toast.success(message);
    }
  });
  const [fileFacts, setFileFacts] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      if (!file) return;
      setFileName(file.name);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result as string;
        console.log(result.split("\n"));
        setFileFacts(result.split("\n").join("@"));
      };
      fileReader.readAsText(file);
    }
  };

  const onClick = () => {
    fileRef.current?.click();
  };

  const onClear = () => {
    setFileFacts("");
    setFileName("");
  };
  return (
    <>
      {state.status === "error" && <Alert color="error">{state.message}</Alert>}
      <form
        ref={ref}
        action={(formData) => {
          const description = formData.get("description")?.toString();
          if (description) {
            addOptimisticFact({ created_at: new Date().toString(), description, id: crypto.randomUUID() });
            ref.current?.reset();
          }
          startTransition(() => {
            formAction(formData);
          });
        }}
        className="space-y-4 mb-10 mt-4"
      >
        <Textarea
          label="New fact"
          name="description"
        />
        <input
          type="text"
          name="file_facts"
          hidden
          defaultValue={fileFacts}
        />
        <input
          key={crypto.randomUUID()}
          ref={fileRef}
          type="file"
          onChange={handleChange}
          hidden
          accept=".txt"
        />
        <div className="flex gap-6 items-center">
          <Button>Submit</Button>
          <div className="flex gap-2">
            <Tooltip delayDuration={0}>
              <Tooltip.Trigger asChild>
                <Button
                  variant={"neutral"}
                  type="button"
                  onClick={onClick}
                >
                  <FileText
                    size={16}
                    className="inline-block mr-2"
                  />
                  {fileName ? fileName : "Import from text file"}
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content
                sideOffset={10}
                className={cardStyles()}
              >
                Every fact needs to be on a new line
              </Tooltip.Content>
            </Tooltip>
            {fileName && (
              <Button
                type="button"
                onClick={onClear}
                variant={"outline"}
                className="ring-0"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
