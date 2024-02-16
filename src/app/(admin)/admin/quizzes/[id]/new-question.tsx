"use client";
import { Button, Dialog, DialogProps, TextInput, ActionIcon, Textarea } from "@aomdev/ui";
import { X } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { createQuestion } from "./actionts";

export function NewQuestion({ children, quiz_id, ...props }: DialogProps & { quiz_id: number }) {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState<Awaited<ReturnType<typeof createQuestion>>>({ _errors: [] });

  const onSubmit = () => {
    if (!inputValue) return;
    if (options.length === 3) return;
    setOptions([...options, inputValue]);
    setInputValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (options.length === 3) return;
      setOptions([...options, inputValue]);
      setInputValue("");
    }
  };

  const onRemoveOption = (option: string) => {
    setOptions((prev) => prev.filter((value) => value !== option));
  };

  return (
    <Dialog {...props}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="space-y-6 w-1/4 max-w-[500px]">
        <div className="flex items-center justify-between">
          <Dialog.Title>New Question</Dialog.Title>
          <Dialog.Close>
            <X size={16} />
          </Dialog.Close>
        </div>
        <form
          className="space-y-4"
          action={async (form) => {
            const data = await createQuestion(quiz_id, options, form);
            setErrors(data);
          }}
        >
          <TextInput
            name="question"
            label="Question"
          />
          <Textarea
            name="description"
            label="Description"
          />
          <TextInput
            error={errors?.answer?._errors[0]}
            name="answer"
            label="Answer"
          />
          <div>
            <span className="text-sm dark:text-gray-200 text-gray-700 block mb-1">Options</span>
            <div className="flex items-center justify-between gap-4">
              <div className="grow">
                <TextInput
                  onKeyDown={onKeyDown}
                  placeholder="Add option"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.currentTarget.value)}
                />
              </div>
              <Button
                type="button"
                disabled={options.length === 3}
                onClick={onSubmit}
              >
                Add
              </Button>
            </div>
            <ul className="list-disc flex flex-col gap-4  mt-4  pl-6">
              {options.map((option) => {
                return (
                  <li
                    key={option}
                    className=""
                  >
                    <div className="flex justify-between">
                      {option}{" "}
                      <ActionIcon
                        onClick={onRemoveOption.bind(null, option)}
                        color="gray"
                        type="button"
                      >
                        <X size={16} />
                      </ActionIcon>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button fullWidth>Submit</Button>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
