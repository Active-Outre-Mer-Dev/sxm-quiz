"use client";

import { ActionIcon, Button, TextInput } from "@aomdev/ui";
import { Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { editOption } from "./actions";
import { toast } from "sonner";

type Props = {
  options: string[];
  task: string;
  id: number;
};

export function QuizOptions({ options, id }: Props) {
  const [state, setState] = useState(options);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const toastId = useRef<string | number>();

  useEffect(() => {
    if (!isFirstRender) {
      syncDB();
    }
  }, [state]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const handleFilter = (option: string) => {
    setState((prev) => prev.filter((current) => current !== option));
    toastId.current = toast.loading("Saving...", { id: toastId.current });
  };

  const addOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastId.current = toast.loading("Saving...", { id: toastId.current });
    const form = new FormData(e.currentTarget);
    const option = form.get("option")?.toString();
    if (!option) return;
    setState((prev) => [...prev, option]);
    e.currentTarget.reset();
  };

  const syncDB = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      startTransition(async () => {
        await editOption(state, id);
        toast.success("Saved!", { id: toastId.current });
        toastId.current = undefined;
      });
    }, 5 * 1000);
  };

  return (
    <>
      <form
        onSubmit={addOption}
        className="w-2/4 mb-10 mx-auto space-y-4"
      >
        <TextInput
          label="Option"
          name="option"
        />
        <Button>Submit</Button>
      </form>
      <ul className=" mx-auto w-2/4 mb-20">
        {state.map((option) => {
          return (
            <li
              key={option}
              className="border-b border-b-neutral-700 py-6 flex items-center justify-between"
            >
              {option}

              <ActionIcon
                onClick={handleFilter.bind(null, option)}
                color="error"
              >
                <Trash2
                  size={"75%"}
                  type="button"
                />
              </ActionIcon>
            </li>
          );
        })}
      </ul>
    </>
  );
}
