"use client";
import { useState } from "react";
import { questions as questionsType } from "@/quiz";
import { randomize } from "@/utils/randomize";

type PropTypes = {
  questions: typeof questionsType;
};

export default function Quiz({ questions }: PropTypes) {
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);
  const completed = step === questions.length;
  const current = questions[step];
  const next = () => {
    if (!completed) {
      setStep(prev => prev + 1);
    }
  };
  const choose = (selected: string) => {
    if (selected === current.answer) {
      setPoints(prev => prev + 1);
      next();
    } else {
      next();
    }
  };
  const onReset = () => {
    setPoints(0);
    setStep(0);
  };
  const options = current ? randomize(current.options) : [];
  const percentage = (100 / questions.length) * points;
  const color = percentage >= 90 ? "text-emerald-600" : percentage >= 50 ? "text-orange-600" : "text-error";
  return (
    <>
      <div className="rounded-md w-2/4 bg-surface shadow-md shadow-shadow/20  p-3 text-on-surface">
        {!completed && (
          <>
            <p className="headline-large text-center my-4">{current?.question}</p>
            <div className="grid grid-cols-2 gap-2 ">
              {options.map(option => {
                return (
                  <button
                    className={`px-4 relative active:top-[2px] bg-surface text-center text-primary 
                      label-large border-outline hover:cursor-pointer
                      py-1 border  hover:bg-zinc-100 duration-200 ease-out rounded-md`}
                    onClick={() => choose(option)}
                    key={option}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}
        {completed && (
          <Save score={percentage} onReset={onReset}>
            <>
              <p className="text-center headline-medium mb-4">You finished the quiz!</p>
              <p className="text-center mb-2">
                You got <span className={`${color} font-bold`}>{percentage}%</span>!
              </p>
            </>
          </Save>
        )}
      </div>
    </>
  );
}

type Props = {
  children: React.ReactNode;
  onReset: () => void;
  score: number;
};

function Save({ children, onReset, score }: Props) {
  const onSave = () => {
    localStorage.setItem("bluepnwage", `${score}`);
  };
  return (
    <div>
      {children}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="bg-surface ring-1 ring-outline block  relative active:top-[2px] text-on-surface font-semibold rounded-full px-4 py-1"
        >
          Retry
        </button>
        <button
          onClick={onSave}
          className="bg-primary block  relative active:top-[2px] text-on-primary font-semibold rounded-full px-4 py-1"
        >
          Save to leaderboards
        </button>
      </div>
    </div>
  );
}
