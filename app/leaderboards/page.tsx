import { RadioInput } from "@/components/RadioInput";
import type { Search } from "@/types";
import { LeaderboardsFilter } from "@/components/Filter";
const score = { username: "bluepnwage", rank: 0, score: 50 };
const leaderboards = Array<typeof score>(15).fill(score);
export default function LeaderboardsPage({ searchParams }: { searchParams?: Search }) {
  const search = new URLSearchParams(searchParams);
  const filter = search.get("subject") || "";
  return (
    <div className="flex px-8 mb-20">
      <aside className="basis-1/5">
        <LeaderboardsFilter filter={filter} />
      </aside>
      <main className="basis-4/5">
        <table className="bg-surface w-full rounded-xl shadow-md ring-1 ring-primary/5 overflow-hidden">
          <thead>
            <tr className="bg-primary-container rounded-xl text-on-primary-container">
              <th className="py-2">Name</th>
              <th>Rank</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {leaderboards.map(({ rank, score, username }, index) => {
              return (
                <tr key={index} className="border-b border-outline-variant ">
                  <td className="py-4 border-r border-outline-variant">{username}</td>
                  <td className="py-4 border-r border-outline-variant">{rank + index + 1}</td>
                  <td className="py-4 ">{score - index}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
