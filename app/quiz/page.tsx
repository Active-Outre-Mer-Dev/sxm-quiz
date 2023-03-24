import { Accordian } from "@/components/Accordian";
import { Search } from "@/components/SearchInput";
import { QuizOptionsDialog } from "@/components/QuizOptionsDialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SXM Quiz - Quiz"
};

const subjectTypes = ["history", "geography", "economy"] as const;
const difficuties = ["easy", "medium", "hard"] as const;

type Search = string | URLSearchParams | Record<string, string> | string[][] | undefined;

function filterCards(searchParams: URLSearchParams, cardList: typeof cards) {
  const subject = searchParams.get("subject");
  const difficulty = searchParams.get("difficulty");
  if (subject && difficulty) {
    return cardList.filter(card => card.difficulty === difficulty && card.type === subject);
  } else if (subject) {
    return cardList.filter(card => card.type === subject);
  } else if (difficulty) {
    return cardList.filter(card => card.difficulty === difficulty);
  } else {
    return cardList;
  }
}

const cards = Array(9)
  .fill(null)
  .map(() => {
    return {
      type: subjectTypes[Math.floor(Math.random() * subjectTypes.length)],
      difficulty: difficuties[Math.floor(Math.random() * difficuties.length)]
    };
  });

export default function Page({ searchParams }: { searchParams?: Search }) {
  const search = new URLSearchParams(searchParams);
  const diff = search.get("difficulty") || "";
  const subject = search.get("subject") || "";
  const cardList = filterCards(search, cards);

  return (
    <>
      <h1 className="display-large text-on-surface text-center mb-10">Find your quiz</h1>
      <div className="flex px-8 gap-4">
        <aside className="basis-1/5 gap-5 flex flex-col items-center">
          <Search />
          <div className="w-full px-2">
            <Accordian difficulty={diff} subject={subject} />
          </div>
        </aside>
        <main className="basis-4/5 mb-20">
          <div className="flex gap-4 mb-16 flex-wrap">
            <QuizOptionsDialog type="general">
              <button className="rounded-xl basis-1/3 grow h-48 flex items-center justify-center bg-primary-container">
                <span className="font-bold text-center headline-medium text-on-primary-container ">
                  General
                </span>
              </button>
            </QuizOptionsDialog>
            <QuizOptionsDialog type="history">
              <button className="rounded-xl basis-1/3 grow h-48 flex items-center justify-center bg-history-base">
                <span className="font-bold text-center headline-medium text-on-history-container ">
                  History
                </span>
              </button>
            </QuizOptionsDialog>
            <QuizOptionsDialog type="geography">
              <button className="rounded-md basis-1/3 grow h-48 flex items-center justify-center bg-geography-base">
                <span className="font-bold text-center headline-medium text-on-geography-container ">
                  Geography
                </span>
              </button>
            </QuizOptionsDialog>
            <QuizOptionsDialog type="economy">
              <button className="rounded-md basis-1/3 grow h-48 flex items-center justify-center bg-economy-base">
                <span className="font-bold text-center text-zinc-50 headline-medium">Economy</span>
              </button>
            </QuizOptionsDialog>
          </div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 ">
            {cardList.map((subject, index) => {
              return <QuizCard {...subject} key={index} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}

type PropTypes = {
  type: "history" | "geography" | "economy";
  difficulty: "easy" | "medium" | "hard";
};

function QuizCard({ type, difficulty }: PropTypes) {
  return (
    <div className="bg-surface ring-1 ring-primary/5 shadow-md rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <span
          className={`h-4 w-4 rounded-full ${
            difficulty === "easy"
              ? "bg-emerald-500"
              : difficulty === "medium"
              ? "bg-orange-500"
              : "bg-rose-500"
          }`}
        />
        <span
          className={`px-2 py-1 rounded-md capitalize ${
            type === "history"
              ? "bg-history-container text-on-history-container"
              : type === "geography"
              ? "bg-geography-container text-on-geography-container"
              : "bg-economy-container text-on-economy-container"
          }`}
        >
          {type}
        </span>
      </div>
      <h3 className="headline-small mb-4 capitalize">SXM {type}</h3>
      <p className="body-large mb-4">Ut dolore nisi Lorem consequat est labore.</p>
      <button className={`relative active:top-[2px] rounded-full px-6 py-3 bg-primary text-on-primary`}>
        Start quiz
      </button>
    </div>
  );
}
