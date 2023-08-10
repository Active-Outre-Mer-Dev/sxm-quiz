import { RingProgress } from "@aomdev/ui";
import { useQuiz } from "../container/container.context";
import { Rocket, Timer, Zap } from "lucide-react";

function ringColor(percentage: number) {
  return {
    color: percentage >= 80 ? "success" : "error",
    rootCircle: percentage >= 80 ? "fill-success-200/30" : "fill-error-200/30",
    textColor: percentage >= 80 ? "text-success-600" : "text-error-600"
  } as const;
}

export default function QuestionSummary() {
  const { score, time, questionCount, streak } = useQuiz();
  const percentage = Math.round((score / questionCount) * 100);
  const { color, rootCircle, textColor } = ringColor(percentage);
  return (
    <>
      <p className="text-center text-2xl  mb-4 font-medium font-heading ">Summary</p>
      <div className="flex justify-center">
        <RingProgress
          rounded
          rootCircle={rootCircle}
          color={color}
          label={<RingLabel className={textColor}>{percentage}</RingLabel>}
          thickness={5}
          size={100}
          value={percentage}
        />
      </div>
      <ul className="space-y-4">
        <li className="flex p-2 justify-between text-success-600 bg-success-200/30 rounded-md">
          <p className="flex items-center gap-2">
            {" "}
            <Rocket size={16} />
            Correct answers:
          </p>
          <p>
            {score}/{questionCount}
          </p>
        </li>
        <li className="flex p-2 justify-between text-warn-600 bg-warn-200/30 rounded-md">
          <p className="flex items-center gap-2">
            {" "}
            <Zap size={16} />
            Highest streak:
          </p>
          <p>{streak}</p>
        </li>
        <li className="flex p-2 justify-between text-error-600 bg-error-200/30 rounded-md">
          <p className="flex items-center gap-2">
            {" "}
            <Timer size={16} /> Duration:
          </p>
          <p>{format(time)}</p>
        </li>
      </ul>
    </>
  );
}

function RingLabel({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`"font-heading ${className} text-2xl font-medium"`}>{children}</span>;
}
function format(seconds: number) {
  return seconds <= 60 ? `${seconds} seconds` : seconds <= 3600 ? `${seconds / 60} minutes` : "WTF";
}
