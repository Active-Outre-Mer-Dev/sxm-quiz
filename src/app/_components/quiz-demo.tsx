"use client";
import { useState, useRef } from "react";
import { WindowFrame } from "@aomdev/ui";
import { QuestionQuizDemo } from "./question-quiz-demo";
import { ListQuizzDemo } from "./list-quiz-demo";
import { QuizToggle } from "./quiz-toggle";
import JSConfetti from "js-confetti";
import { ChevronRight } from "lucide-react";

export function QuizDemo() {
  const [state, setState] = useState(true);
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
  const toggle = () => {
    setState(prev => !prev);
  };

  return (
    <>
      <div ref={container} className="h-full pt-5 flex flex-col gap-6 relative">
        <div className="flex  justify-between items-center">
          <span className="font-semibold text-gray-900">Demo:</span>
          <div className="flex gap-4">
            <QuizToggle label="Toggle quiz" onToggle={toggle}>
              <ChevronRight size={16} className="-rotate-180" />
            </QuizToggle>
            <QuizToggle label="Toggle quiz" onToggle={toggle}>
              <ChevronRight size={16} />
            </QuizToggle>
          </div>
        </div>
        <div className="grow  relative ">
          <div className="inset-0 bg-neutral-200 dark:bg-neutral-700 blur-md absolute" />
          <WindowFrame className="relative  w-full h-full">
            {" "}
            {state ? <QuestionQuizDemo onConfetti={onConfetti} /> : <ListQuizzDemo onConfetti={onConfetti} />}
          </WindowFrame>
        </div>
      </div>
    </>
  );
}
