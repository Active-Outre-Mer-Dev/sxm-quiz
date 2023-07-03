import { Rocket, Timer } from "lucide-react";
import { RingProgress } from "@aomdev/ui";
import { useQuiz } from "../container/container.context";

export default function ListSummary() {
  const { score, time, questionCount } = useQuiz();
  const percentage = Math.round((score / questionCount) * 100);
  return (
    <>
      <p className="text-center text-2xl  mb-4 font-medium font-heading ">Summary</p>
      <div className="flex justify-center">
        <RingProgress
          rounded
          rootCircle="fill-success-200/30"
          color={"success"}
          label={<RingLabel>{percentage}</RingLabel>}
          thickness={5}
          size={100}
          value={percentage}
        />
      </div>
      <ul className="space-y-4 font-medium">
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

function RingLabel({ children }: { children: React.ReactNode }) {
  return <span className="font-heading text-success-600 text-2xl font-medium">{children}</span>;
}

function format(seconds: number) {
  return new Intl.NumberFormat("en-US", {
    unit: seconds >= 60 ? "minute" : "second",
    style: "unit",
    unitDisplay: "long"
  }).format(seconds >= 60 ? Math.floor(seconds / 60) : seconds);
}
