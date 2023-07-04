"use client";
import { Title } from "@aomdev/ui";
import data from "@/data-lists.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import type { Variants } from "framer-motion";

const variants: Variants = {
  enter: direction => ({
    x: direction * 600,
    opacity: 0,
    transition: { type: "tween" }
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween" }
  },
  exit: direction => ({
    x: direction * -600,
    opacity: 0,
    transition: { type: "tween" }
  })
};

function useInterval(callback: () => void, duration?: number) {
  const timer = useRef<NodeJS.Timer>();

  const start = () => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        callback();
      }, duration || 1000);
    } else {
      clearInterval(timer.current);
      timer.current = undefined;
      start();
    }
  };
  const pause = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };
  return [start, pause] as const;
}

export function RandomFacts() {
  const [value, setValue] = useState([1, 0]);
  const [start, pause] = useInterval(() => next(), 3500);

  useEffect(() => {
    start();
    return pause;
  }, []);
  const [direction, current] = value;
  const fact = data.randomFacts[current];

  const next = () => {
    slide(1);
  };

  const slide = (direction: number) => {
    setValue(([, cur]) => {
      let nextValue = cur + direction;
      if (direction === 1 && nextValue >= data.randomFacts.length) nextValue = 0;
      if (direction === -1 && nextValue < 0) nextValue = data.randomFacts.length - 1;
      return [direction, nextValue];
    });
  };

  const prev = () => {
    slide(-1);
  };
  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={start}
      className="rounded-xl group overflow-hidden relative flex flex-col items-center  radial-gradient text-center h-72 lg:h-56  p-4  mx-auto w-11/12 lg:w-3/4 text-white"
    >
      <Title order={2} className="font-heading ">
        Did you know?
      </Title>
      <AnimatePresence custom={direction}>
        <motion.span
          custom={direction}
          key={current}
          variants={variants}
          initial="enter"
          animate={"visible"}
          exit={"exit"}
          className="text-primary-50 text-xl absolute -inset-0  flex items-center justify-center "
        >
          <span className="w-11/12 lg:w-3/4">{fact}</span>
        </motion.span>
      </AnimatePresence>

      <button
        onClick={prev}
        className={`absolute group-hover:opacity-100 opacity-0 duration-200 ease-out flex items-center justify-center bg-white h-7 w-7 rounded-full
       text-primary-600 top-2/4 -translate-y-2/4 left-4`}
      >
        <ChevronLeft size={"75%"} />
      </button>
      <button
        onClick={next}
        className={`absolute group-hover:opacity-100 opacity-0 duration-200 ease-out flex items-center justify-center bg-white h-7 w-7 rounded-full
       text-primary-600 top-2/4 -translate-y-2/4 right-4`}
      >
        <ChevronRight size={"75%"} />
      </button>
    </div>
  );
}
