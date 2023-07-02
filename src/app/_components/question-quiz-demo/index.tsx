import { useAnimate } from "framer-motion";
import { Button } from "@aomdev/ui";

export function QuestionQuizDemo({ onConfetti }: { onConfetti: () => void }) {
  return (
    <>
      <p className="font-heading font-medium mb-4 text-2xl text-center">When was Saint Martin discovered?</p>
      <ul className="space-y-4 w-3/4 mx-auto">
        <li>
          <Button onClick={onConfetti} fullWidth variant="neutral">
            1493
          </Button>
        </li>
        <Option option="1492" />
        <Option option="1648" />
        <Option option="1297" />
      </ul>
    </>
  );
}

function Option({ option }: { option: string }) {
  const [scope, animate] = useAnimate<HTMLButtonElement>();

  const onClick = () => {
    animate(scope.current, { x: [-5, 5, -2.5, 2.5, 0] }, { duration: 0.4 });
  };

  return (
    <li>
      <Button ref={scope} onClick={onClick} fullWidth variant={"neutral"}>
        {option}
      </Button>
    </li>
  );
}
