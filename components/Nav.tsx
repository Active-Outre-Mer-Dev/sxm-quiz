import { NavLink } from "./NavLink";

export function Navbar() {
  return (
    <header className="mx-auto w-4/5 sticky top-4 left-0 h-20 overflow-hidden bg-surface mt-4 shadow-md rounded-full mb-16">
      <nav className="h-full ">
        <ul className="flex h-full">
          <li className="basis-1/4">
            <NavLink href="/">Home</NavLink>
          </li>
          <li className="basis-1/4">
            <NavLink href="/quiz">Quiz</NavLink>
          </li>
          <li className="basis-1/4">
            <NavLink href="/leaderboard">Leaderboard</NavLink>
          </li>
          <li className="basis-1/4">
            <NavLink href="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
