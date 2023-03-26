"use client";
import { useState } from "react";
import { questions as questionsType } from "@/quiz";
import { randomize } from "@/utils/randomize";
import { Progress } from "@/components/Progress";

type PropTypes = {
  questions: typeof questionsType;
  type: string;
};

export default function Quiz({ questions, type }: PropTypes) {
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  const next = () => {
    if (!completed) {
      setStep(prev => prev + 1);
    }
  };

  const choose = (selected: string) => {
    if (selected === current.answer) {
      setPoints(prev => addPoints(prev + streak, current.difficulty));
      setStreak(prev => prev + 1);
      next();
    } else {
      setStreak(0);
      next();
    }
  };

  const onReset = () => {
    setPoints(0);
    setStep(0);
  };

  const completed = step === questions.length;
  const current = questions[step];
  const options = current ? randomize([...current.options, current.answer]) : [];
  const percentage = (100 / questions.length) * points;
  const color = percentage >= 90 ? "text-emerald-600" : percentage >= 50 ? "text-orange-600" : "text-error";
  const progress = (step / questions.length) * 100;

  return (
    <>
      <div
        className={`rounded-xl ring-1 ring-primary/5 w-2/4 bg-surface shadow-md
       shadow-shadow/20  p-3 text-on-surface`}
      >
        {!completed && (
          <>
            <div className="flex justify-between">
              <h2 className="title-large capitalize text-on-surface-variant mb-2">{type}</h2>
              <div className="space-y-4">
                <Progress progress={progress} />
                <p>
                  <span>Streak:</span> {streak}
                </p>
              </div>
            </div>
            <p className="title-medium text-on-surface-variant capitalize">
              Difficulty: {current.difficulty}
            </p>
            <hr className="text-outline my-4" />
            <p className="headline-large text-center my-8">{current?.question}</p>
            <div className="grid grid-cols-2 gap-2 ">
              {options.map(option => {
                return (
                  <button
                    className={`px-4 rounded-full relative active:top-[2px] bg-surface text-center text-primary 
                      label-large border-outline hover:cursor-pointer
                      py-2 border  hover:bg-zinc-100 duration-200 ease-out`}
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
          <Save score={points} onReset={onReset}>
            <>
              <p className="text-center headline-medium mb-4">You finished the quiz!</p>
              <p className="text-center mb-2">
                You got <span className={`${color} font-bold`}>{points} points </span>!
              </p>
            </>
          </Save>
        )}
      </div>
    </>
  );
}

function addPoints(points: number, difficulty: "easy" | "medium" | "hard") {
  switch (difficulty) {
    case "easy": {
      return points + 1;
    }
    case "medium": {
      return points + 2;
    }
    case "hard": {
      return points + 3;
    }
  }
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
    <div className="h-64 flex-col flex items-center justify-center">
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
