import { Button } from "@aomdev/ui";
import { useEffect, useRef, useState } from "react";

type PropTypes = {
  onClick: (duration: number) => void;
  hasStarted: boolean;
  timer: number;
};

function useInterval(cb: () => void, ms?: number) {
  const timer = useRef<NodeJS.Timer>();

  const clear = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };

  const start = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => cb(), ms);
  };
  return [start, clear];
}

export function ListTimer({ onClick, hasStarted, timer }: PropTypes) {
  const [duration, setDuration] = useState(timer);
  const [start, clear] = useInterval(() => setDuration(prev => prev - 1), 1000 * 1);

  useEffect(() => {
    if (hasStarted) start();
  }, [hasStarted]);

  useEffect(() => {
    if (duration < 0) {
      onClick(0);
      clear();
      setDuration(0);
    }
  }, [duration]);

  return (
    <div className={"flex gap-2 items-center"}>
      <p>{seconds.format(duration)} left</p>
      {hasStarted && (
        <Button onClick={() => onClick(duration)} size={"sm"} variant="error">
          Give up
        </Button>
      )}
    </div>
  );
}

const seconds = new Intl.NumberFormat("en-US", { style: "unit", unit: "second", unitDisplay: "long" });
