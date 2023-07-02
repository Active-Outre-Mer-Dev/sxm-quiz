"use client";
import { FormEvent, useEffect, useReducer, useRef, useState } from "react";
import { Button, TextInput, Card } from "@aomdev/ui";
import { QuizProgression } from "./quiz-progress";
import { QuizOption } from "./list-option";
import { ListTimer } from "./list-timer";
import { initialState, reducer } from "./reducer";
import { useQuiz } from "../container/container.context";
import { Suspense, lazy } from "react";
import { ListDetailsLoad } from "./list-details-load";

const ListDetails = lazy(() => import("./list-details"));

type PropTypes = {
  task: string;
  options: string[];
};

//timer for quiz in seconds
const quizTimer = 60 * 2;

export default function ListQuiz(props: PropTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [options, setOptions] = useState(props.options.map(option => option.toLowerCase()));
  const ref = useRef<HTMLInputElement>(null);
  const { onComplete, complete } = useQuiz();

  useEffect(() => {
    if (hasStarted) ref.current?.focus();
  }, [state.score, hasStarted]);

  useEffect(() => {
    if (giveUp || state.inputs.length === props.options.length) {
      onComplete(state.score, duration, 0);
    }
  }, [giveUp, state.inputs.length, props.options.length]);

  useEffect(() => {
    if (!complete) onReset();
  }, [complete]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    let count = state.inputs.length;
    for (const option of options) {
      if (option === value.toLowerCase()) {
        dispatch({ type: "next", value: value.toLowerCase() });
        setOptions(prev => prev.filter(option => option !== value));
        count++;
        break;
      }
    }
    if (count === props.options.length) setHasStarted(false);
  };

  const isFinished = state.inputs.length === props.options.length;

  const onStart = () => {
    setHasStarted(true);
  };

  const onReset = () => {
    dispatch({ type: "reset" });
    setOptions(props.options.map(option => option.toLowerCase()));
    setHasStarted(false);
    setDuration(0);
    setGiveUp(false);
  };

  const onGiveUp = (duration: number) => {
    setGiveUp(true);
    setDuration(quizTimer - duration);
  };

  return (
    <div>
      <Suspense fallback={<ListDetailsLoad />}>
        {!isFinished && !giveUp ? (
          <>
            <ListTimer hasStarted={hasStarted} onClick={onGiveUp} timer={quizTimer} />
            <QuizProgression
              progress={(state.inputs.length / props.options.length) * 100}
              optionsLeft={props.options.length - state.inputs.length}
            />
            <p className="font-heading text-2xl mb-6">{props.task}</p>
            {hasStarted ? (
              <TextInput ref={ref} key={state.score} onChange={onChange} />
            ) : (
              <Button onClick={onStart}>Start</Button>
            )}
            <div className="grid grid-cols-4 mt-6">
              {state.inputs.map(option => {
                return <Inputs key={option} option={option} />;
              })}
            </div>
          </>
        ) : (
          <div className="flex">
            <ListDetails>
              {props.options.map(option => {
                return (
                  <QuizOption
                    key={option}
                    active={state.inputs.includes(option.toLowerCase())}
                    option={option}
                  />
                );
              })}
            </ListDetails>
          </div>
        )}
      </Suspense>
    </div>
  );
}

function Inputs({ option }: { option: string }) {
  return <p className="capitalize">{option}</p>;
}
