import type { Search } from "@/types";
import type { Metadata } from "next";
import { LeaderboardsFilter } from "@/components/Filter";
import { db } from "@/lib/planetscale";

async function getLeaderboards() {
  const data = await db.selectFrom("leaderboards").selectAll().execute();
  return data;
}

export const metadata: Metadata = {
  title: "SXM Quiz - Leaderboards"
};

const score = { user: "bluepnwage", rank: 0, score: 50 };
const leaderboards = Array<typeof score>(15).fill(score);

export default async function LeaderboardsPage({ searchParams }: { searchParams?: Search }) {
  const boards = await getLeaderboards();
  console.log(boards);
  const search = new URLSearchParams(searchParams);
  const filter = search.get("subject") || "";
  return (
    <div className="flex px-8 mb-20">
      <aside className="basis-1/5 mt-16 space-y-2">
        <p className="text-lg text-on-surface-variant">Filters</p>
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
            {boards.map(({ score, user_id }, index) => {
              return (
                <tr key={index} className="border-b border-outline-variant ">
                  <td className="py-4 border-r border-outline-variant">{user_id}</td>
                  <td className="py-4 border-r border-outline-variant">{index + 1}</td>
                  <td className="py-4 ">{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
