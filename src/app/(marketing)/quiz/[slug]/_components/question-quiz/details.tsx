"use client";
import { ScrollArea, Button } from "@aomdev/ui";
import { useState } from "react";
import { useQuiz } from "../container/container.context";

import type { MultipleChoice } from "@/types/custom.types";

type PropTypes = {
  questions: MultipleChoice[];
  choices: string[];
};

export default function QuestionQuizDetails({ choices, questions }: PropTypes) {
  const { onReset } = useQuiz();

  return (
    <div className="basis-3/5 grow relative">
      <ScrollArea
        style={{ height: window.screen.height - 64 - 80 - 80 || 300 }}
        className="h-96 -mr-4 pb-4 pr-4 grow"
      >
        <div className="flex justify-between">
          <p className="font-heading text-2xl font-medium mb-4 ">Details</p>
          <Button
            onClick={onReset}
            size={"sm"}
            className="lg:hidden"
          >
            Try again
          </Button>
        </div>
        <ul className="space-y-6">
          {questions.map((value, index) => {
            const choice = choices[index];
            return (
              <li key={value.question}>
                <p className="mb-4 text-lg font-medium">{value.question}</p>
                <Options
                  description={value.description || ""}
                  answer={value.answer}
                  choice={choice}
                  options={value.options}
                />
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}

type Props = {
  options: string[];
  answer: string;
  choice: string;
  description: string;
};

function Options({ answer, choice, options, description }: Props) {
  const [show, setShow] = useState(choice === answer);
  return (
    <ul className="space-y-2">
      {options.map((option) => {
        return (
          <li key={option}>
            <span
              className={`p-2 border rounded-md flex items-center justify-between ${
                (option === choice && choice === answer) || (option === answer && show)
                  ? "bg-success-600 dark:bg-success-700 text-white border-success-600 dark:border-success-700"
                  : option === choice && choice !== answer
                  ? "bg-error-600 text-white dark:bg-error-700 dark:border-error-700"
                  : "border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {option}{" "}
              {choice !== answer && option === choice && (
                <Button
                  size={"sm"}
                  variant={"neutral"}
                  className="text-neutral-800"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? "Hide answer" : "Show answer"}
                </Button>
              )}
            </span>{" "}
            {show && option === answer && <span className="mt-2 text-sm">{description}</span>}
          </li>
        );
      })}
    </ul>
  );
}
