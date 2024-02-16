"use client";
import { ActionIcon, Button, Dialog, TextInput, Textarea } from "@aomdev/ui";
import { Pencil, Check, X, Pen } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import { editQuestion } from "./actionts";
import { useRef } from "react";

type PropTypes = {
  question: {
    answer: string;
    description: string;
    id: number;
    options: string[];
    question: string;
    quiz_id: number;
  };
};

export function EditQuestionDialog({ question }: PropTypes) {
  const [options, setOptions] = useState<string[]>(question.options);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const onOptionEdit = (option: string, oldVal: string) => {
    setOptions((prev) => prev.map((o) => (o === oldVal ? option : o)));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger
        asChild
        size={"sm"}
        className="flex items-center justify-center rounded-full"
      >
        <ActionIcon>
          <Pen size={"50%"} />
        </ActionIcon>
      </Dialog.Trigger>
      <Dialog.Content
        blur
        className="max-w-3xl w-2/4"
      >
        <div className="flex items-center justify-between">
          <Dialog.Title>Edit</Dialog.Title>
          <Dialog.Close>
            <X size={16} />
          </Dialog.Close>
        </div>
        <form
          className="space-y-4"
          action={async (formData) => {
            const test = await editQuestion(question.id, question.quiz_id, options, formData);
            console.log(test);
            setOpen(false);
          }}
        >
          <TextInput
            defaultValue={question.question}
            name="question"
            label="Question"
          />
          <Textarea
            defaultValue={question.description}
            name="description"
            label="Description"
          />
          <TextInput
            defaultValue={question.answer}
            // error={errors?.answer?._errors[0]}
            name="answer"
            label="Answer"
          />
          <div>
            <span className="text-sm dark:text-gray-200 text-gray-700 block mb-1">Options</span>
            <ul className="list-disc flex flex-col gap-4  mt-4  pl-6">
              {options.map((option) => {
                return (
                  <EditOption
                    onOptionEdit={onOptionEdit}
                    option={option}
                  />
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

type EditProps = {
  option: string;
  onOptionEdit: (option: string, oldVal: string) => void;
};

function EditOption({ option, onOptionEdit }: EditProps) {
  const [edit, setEdit] = useState(false);
  const [newOption, setNewOption] = useState(option);
  const toggleEdit = () => setEdit(!edit);

  const onClick = () => {
    onOptionEdit(newOption, option);
    toggleEdit();
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setNewOption(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      toggleEdit();
      onOptionEdit(newOption, option);
    }
  };
  return (
    <>
      {edit ? (
        <div className="flex items-center justify-between gap-4 -ml-4">
          <div className="grow">
            <TextInput
              value={newOption}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              autoFocus
              size={"sm"}
            />
          </div>
          <ActionIcon
            type="button"
            onClick={onClick}
            color="gray"
          >
            <Check size={16} />
          </ActionIcon>
        </div>
      ) : (
        <li
          key={option}
          className=""
        >
          <div className="flex justify-between">
            {option}{" "}
            <ActionIcon
              // onClick={onRemoveOption.bind(null, option)}
              color="gray"
              type="button"
            >
              {!edit && (
                <Pencil
                  onClick={toggleEdit}
                  size={16}
                />
              )}
            </ActionIcon>
          </div>
        </li>
      )}
    </>
  );
}
