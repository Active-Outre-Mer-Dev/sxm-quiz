import { Progress } from "@aomdev/ui";

type PropTypes = {
  optionsLeft: number;
  progress: number;
};

export function QuizProgression({ optionsLeft, progress }: PropTypes) {
  return (
    <div className="justify-between mb-5 flex items-end border-b border-b-neutral-200 pb-2">
      <Progress value={progress} size={"sm"} className="w-1/4" />

      <span className="font-medium">
        Beaches left: <span className="font-heading">{optionsLeft}</span>
      </span>
    </div>
  );
}
