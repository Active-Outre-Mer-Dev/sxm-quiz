import { Accordian } from "@/components/Accordian";
import { Search } from "@/components/SearchInput";

export default function Page() {
  return (
    <>
      <h1 className="display-large text-on-surface text-center">Find your quiz</h1>
      <div className="flex px-8 gap-4">
        <aside className="basis-1/5  flex flex-col items-center">
          <Search />
          <div className="w-full">
            <Accordian />
          </div>
        </aside>
        <main className="basis-4/5 mb-20">
          <div className="flex gap-4 mb-16">
            <div className="rounded-md basis-1/3 h-48 flex items-center justify-center -bg--md-custom-color-History">
              <p className="font-bold text-center headline-medium ">History</p>
            </div>
            <div className="rounded-md basis-1/3 flex items-center justify-center -bg--md-custom-color-Geography">
              <p className="font-bold text-center headline-medium ">Geography</p>
            </div>
            <div className="rounded-md basis-1/3 flex items-center justify-center -bg--md-custom-color-Economy">
              <p className="font-bold text-center text-zinc-50 headline-medium">Economy</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 ">
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
            <QuizCard />
          </div>
        </main>
      </div>
    </>
  );
}

function QuizCard() {
  return (
    <div className="bg-primary/5 shadow-md rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-emerald-600 h-4 w-4 rounded-full" />
        <span className="px-2 py-1 rounded-md -bg--md-custom-color-History text-zinc-50">History</span>
      </div>
      <h3 className="headline-small mb-4">SXM History</h3>
      <p className="body-large mb-4">Ut dolore nisi Lorem consequat est labore.</p>
      <button className="bg-primary relative active:top-[2px] rounded-full text-on-primary  px-6 py-3">
        Start quiz
      </button>
    </div>
  );
}
