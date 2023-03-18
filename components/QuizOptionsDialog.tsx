"use client";
import { Dialog } from "./Dialog";
import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { useRouter } from "next/navigation";

type PropTypes = {
  children: React.ReactNode;
  type: string;
};

export function QuizOptionsDialog({ children, type }: PropTypes) {
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([10]);
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(`/quiz/${type}`, location.href);
    if (difficulty) url.searchParams.set("difficulty", difficulty);
    url.searchParams.set("questions", questions[0].toString());
    router.push(url.toString());
  };

  return (
    <Dialog title="Customize quiz">
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <form onSubmit={onSubmit}>
          <fieldset className="mb-4">
            <legend className="mb-2 title-medium">Difficulty</legend>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input
                  onChange={e => setDifficulty(e.currentTarget.value)}
                  id="easy"
                  type={"radio"}
                  className="accent-primary inline-block mr-4 h-5 w-5"
                  name="difficulty"
                  value={"easy"}
                />
                <label htmlFor="easy" className="">
                  Easy
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={e => setDifficulty(e.currentTarget.value)}
                  id="medium"
                  type={"radio"}
                  className="accent-primary inline-block mr-4 h-5 w-5"
                  name="difficulty"
                  value={"medium"}
                />
                <label htmlFor="medium" className="">
                  Medium
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={e => setDifficulty(e.currentTarget.value)}
                  id="hard"
                  type={"radio"}
                  className="accent-primary inline-block mr-4 h-5 w-5"
                  name="difficulty"
                  value={"hard"}
                />
                <label htmlFor="hard" className="">
                  Hard
                </label>
              </li>
            </ul>
          </fieldset>
          <span id="question-amount">Number of questions:</span>
          <Slider value={questions} max={20} onValueChange={setQuestions} label="question-amount" />
          <div className="flex gap-2 mt-6  justify-end">
            <Button intent={"text"}>Play</Button>
            <Dialog.Close asChild>
              <Button intent={"text"}>Cancel</Button>
            </Dialog.Close>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
