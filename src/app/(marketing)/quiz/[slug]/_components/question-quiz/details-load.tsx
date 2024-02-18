import { Skeleton } from "@aomdev/ui";

const questions = Array(9).fill(null);
const options = Array(4).fill(null);

export function QuizDetailsLoad() {
  return (
    <div className="basis-3/5 grow relative overflow-hidden">
      <div
        style={{ height: window.screen.height - 64 - 80 - 80 || 300 }}
        className="h-96 -mr-4 pb-4 pr-4 grow"
      >
        <p className="font-heading text-2xl font-medium mb-4 ">Details</p>
        <ul className="space-y-6">
          {questions.map((_, index) => {
            return (
              <li key={index}>
                <Skeleton animate className="mb-4 rounded-sm text-lg h-4 w-2/4 " />
                <Options />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Options() {
  return (
    <ul className="space-y-2">
      {options.map((_, index) => {
        return (
          <li key={index}>
            <Skeleton animate className={`h-6  rounded-sm flex items-center justify-between`}></Skeleton>{" "}
          </li>
        );
      })}
    </ul>
  );
}
