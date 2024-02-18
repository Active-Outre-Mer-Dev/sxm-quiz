"use client";
import { Title } from "@aomdev/ui";
import data from "@/random-facts.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import type { Variants } from "framer-motion";

const variants: Variants = {
  enter: (direction) => ({
    x: direction * 600,
    opacity: 0,
    transition: { type: "tween" }
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "tween" }
  },
  exit: (direction) => ({
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
  const [start, pause] = useInterval(() => next(), 1000 * 10);

  useEffect(() => {
    start();
    return pause;
  }, []);

  const [direction, current] = value;
  const fact = data.randomFacts[current];

  const next = (clicked?: boolean) => {
    if (clicked) pause();
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
    pause();
    slide(-1);
  };
  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={start}
      className="container mx-auto bg-primary-200/30 dark:bg-primary-600/30 my-36 lg:rounded-md py-10  min-h-[250px] group relative overflow-hidden"
    >
      <Title
        order={2}
        className="font-heading text-primary-600 dark:text-primary-200 mb-4 text-center"
      >
        Did you know?
      </Title>
      <div className="relative flex justify-center">
        <AnimatePresence custom={direction}>
          <motion.span
            custom={direction}
            key={current}
            variants={variants}
            initial="enter"
            animate={"visible"}
            exit={"exit"}
            className=" text-xl  text-center block absolute"
          >
            <span className="w-clamp">{fact}</span>
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className={`absolute group-hover:opacity-100 opacity-0 duration-200 ease-out flex items-center justify-center bg-primary-600 h-7 w-7 rounded-full
       text-white top-2/4 -translate-y-2/4 left-4`}
      >
        <ChevronLeft size={"75%"} />
      </button>
      <button
        onClick={() => next(true)}
        className={`absolute group-hover:opacity-100 opacity-0 duration-200 ease-out flex items-center justify-center bg-primary-600 h-7 w-7 rounded-full
       text-white top-2/4 -translate-y-2/4 right-4`}
      >
        <ChevronRight size={"75%"} />
      </button>
    </div>
  );
}
