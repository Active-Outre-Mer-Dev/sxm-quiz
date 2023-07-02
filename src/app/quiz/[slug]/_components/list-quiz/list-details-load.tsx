import { Skeleton } from "@aomdev/ui";

const options = Array(30).fill(null);

export function ListDetailsLoad() {
  return (
    <div className="grow p-2 ">
      <div
        style={{ height: window.screen.height - 64 - 80 - 150 || 300 }}
        className="-mr-4 pb-4 pr-4 overflow-hidden"
      >
        <p className="text-center text-2xl   mb-4 font-medium font-heading ">All Beaches</p>
        <div className="grid grid-cols-3 gap-6">
          {options.map((_, key) => {
            return (
              <Skeleton
                animate
                key={key}
                className={`rounded-sm h-8  flex items-center justify-center p-2 `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
