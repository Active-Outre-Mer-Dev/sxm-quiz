"use client";
import { useState, useRef } from "react";
import { WindowFrame } from "@aomdev/ui";
import { QuestionQuizDemo } from "./question-quiz-demo";
import { ListQuizzDemo } from "./list-quiz-demo";
import { QuizToggle } from "./quiz-toggle";
import JSConfetti from "js-confetti";

export function QuizDemo() {
  const [state, setState] = useState<"quiz" | "list">("quiz");
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>();
  const confetti = useRef<JSConfetti>();

  const onConfetti = () => {
    if (canvas.current && confetti.current) {
      confetti.current.addConfetti();
    } else {
      canvas.current = document.createElement("canvas");
      canvas.current.style.position = "absolute";
      canvas.current.style.width = "100%";
      canvas.current.style.top = "0px";
      canvas.current.style.pointerEvents = "none";
      container.current?.append(canvas.current);
      confetti.current = new JSConfetti({ canvas: canvas.current });
      confetti.current.addConfetti();
    }
  };
  const toggle = (type: typeof state) => {
    setState(type);
  };

  return (
    <>
      <div ref={container} className="basis-1/2 space-y-10 relative">
        <div className="flex gap-4">
          <QuizToggle active={state === "quiz"} type="quiz" onToggle={toggle} />
          <QuizToggle active={state === "list"} type="list" onToggle={toggle} />
        </div>
        <div className="basis-1/2  relative ">
          <div className="inset-0 bg-neutral-200 blur-md absolute" />
          <WindowFrame className="relative bg-white w-full h-full">
            {" "}
            {state === "quiz" ? (
              <QuestionQuizDemo onConfetti={onConfetti} />
            ) : (
              <ListQuizzDemo onConfetti={onConfetti} />
            )}
          </WindowFrame>
        </div>
      </div>
    </>
  );
}
