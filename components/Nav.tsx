import { NavLink } from "./NavLink";
import { Profile } from "./Profile";

export function Navbar() {
  return (
    <header className="z-50 flex px-10 shadow-md  items-center sticky top-0 left-0 h-16 overflow-hidden bg-surface  mb-16">
      <div className="basis-9/12 flex items-center h-full space-x-8">
        <span className="text-xl">SXM Quiz</span>
        <nav className=" h-full">
          <ul className="flex h-full gap-4">
            <li className="">
              <NavLink href="/">Home</NavLink>
            </li>
            <li className="">
              <NavLink href="/quiz">Quiz</NavLink>
            </li>
            <li className="">
              <NavLink hardNav href="/leaderboards">
                Leaderboards
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="basis-3/12 flex justify-end">
        {/*@ts-expect-error*/}
        <Profile />
      </div>
    </header>
  );
}
