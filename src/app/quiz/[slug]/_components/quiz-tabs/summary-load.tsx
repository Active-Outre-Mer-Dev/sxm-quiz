import { Skeleton } from "@aomdev/ui";
export function SummaryLoad() {
  return (
    <>
      <div className="flex justify-center">
        <Skeleton animate className="rounded-full " style={{ height: 100, width: 100 }} />
      </div>
      <ul className="space-y-4 font-medium">
        <li className="rounded-md">
          <Skeleton animate className="p-2 h-8 rounded-md" />
        </li>
        <li className="rounded-md">
          <Skeleton animate className="p-2 h-8 rounded-md" />
        </li>
        <li className="rounded-md">
          <Skeleton animate className="p-2 h-8 rounded-md" />
        </li>
      </ul>
    </>
  );
}
