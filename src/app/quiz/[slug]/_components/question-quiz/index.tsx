"use client";
import { useReducer, useState, useRef, useEffect } from "react";
import { Button, Progress } from "@aomdev/ui";
import { initialState, reducer } from "./reducer";
import { useQuiz } from "../container/container.context";
import { Suspense, lazy } from "react";
import { QuizDetailsLoad } from "./details-load";
import type { MultipleChoice } from "@/types/database.types";

const QuestionQuizDetails = lazy(() => import("./details"));

type PropTypes = {
  questions: MultipleChoice[];
};

function useTimer() {
  const [time, setTime] = useState(0);
  const id = useRef<NodeJS.Timer>();

  const stop = () => {
    clearInterval(id.current);
  };
  const start = () => {
    id.current = setInterval(() => setTime(prev => prev + 1), 1 * 1000);
  };
  const reset = () => {
    setTime(0);
    stop();
  };

  return [time, { stop, start, reset }] as const;
}

export default function Quiz(props: PropTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [time, timer] = useTimer();
  const { onComplete, complete } = useQuiz();

  useEffect(() => {
    if (state.current === props.questions.length) onComplete(state.points, time, state.highStreak);
  }, [state.current, props.questions.length]);

  useEffect(() => {
    if (!complete && state.choices.length === props.questions.length) onReset();
  }, [complete, props.questions.length]);

  const completed = state.choices.length === props.questions.length;
  const question = props.questions[state.current];

  const options = !completed ? question.options : [];
  const progress = (state.current / props.questions.length) * 100;

  const onReset = () => {
    dispatch({ type: "reset" });
    timer.reset();
  };

  const onChoose = (choice: string) => {
    if (state.current === 0) timer.start();
    dispatch({ type: "next", value: { answer: question.answer, choice } });
    if (state.current === props.questions.length - 1) {
      timer.stop();
    }
  };

  const details = {
    choices: state.choices,
    questions: props.questions
  };

  return (
    <Suspense fallback={<QuizDetailsLoad />}>
      {completed ? (
        <QuestionQuizDetails {...details} />
      ) : (
        <>
          <div className=" flex justify-between items-end border-b border-neutral-200 pb-3 mb-5">
            <Progress aria-label="Quiz progression" size={"sm"} className="w-1/4" value={progress} />
            <span className="font-medium">
              Streak: <span className="font-heading">{state.streak}</span>
            </span>
          </div>
          <div className="">
            <p className="mb-6 text-center text-3xl font-medium font-heading ">{question.question}</p>
            <div className="flex gap-4 flex-wrap">
              {options.map(option => {
                return <Option key={option} option={option} onChoose={onChoose} />;
              })}
            </div>
          </div>
        </>
      )}
    </Suspense>
  );
}

type OptionProps = { onChoose: (choice: string) => void; option: string };

function Option({ option, onChoose }: OptionProps) {
  const onClick = () => onChoose(option);
  return (
    <Button variant={"neutral"} onClick={onClick} className="grow basis-full">
      {option}
    </Button>
  );
}
