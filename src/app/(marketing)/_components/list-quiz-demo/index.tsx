"use client";
import json from "@/sxm-beaches.json";
import { Button, TextInput } from "@aomdev/ui";
import { useRef, useState, useEffect } from "react";
import { ShowConfetti } from "./show-confetti";

import type { FormEvent } from "react";

const beaches = json.beaches.map(beach => beach.toLowerCase().trim());

type PropTypes = {
  onConfetti: () => void;
};

export function ListQuizzDemo({ onConfetti }: PropTypes) {
  const [answers, setAnswers] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (answers.length === 0) return;
    input.current?.focus();
  }, [answers.length]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.toLowerCase().trim().replaceAll(" ", "");
    let isOption = false;
    let answer = "";

    for (const option of beaches) {
      if (option.toLowerCase().trim().replaceAll(" ", "") === text) {
        isOption = true;
        answer = option;
      }
    }

    for (const option of answers) {
      if (option.toLowerCase().trim().replaceAll(" ", "") === text) isOption = false;
    }

    if (isOption) {
      setAnswers(prev => [...prev, answer]);
    }
  };

  const onReset = () => {
    setAnswers([]);
  };

  const complete = answers.length === 5;

  return (
    <div style={{ minHeight: 250 }}>
      {complete ? (
        <ShowConfetti onConfetti={onConfetti}>
          <Button onClick={onReset} className="block mx-auto">
            Try again
          </Button>
        </ShowConfetti>
      ) : (
        <>
          <p className="font-medium font-heading text-2xl mb-4">Name at least 5 beaches</p>
          <TextInput onChange={onChange} name="answer" id="answer" ref={input} key={answers.length} />

          <ul className="space-y-2 mt-8 list-disc ml-4">
            {answers.map(beach => {
              return (
                <li key={beach}>
                  <p className="capitalize">{beach}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
