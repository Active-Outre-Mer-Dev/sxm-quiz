export default function Home() {
  return (
    <main className={"flex flex-col items-center"}>
      <header className="w-4/5">
        <h1 className="display-large mb-2 text-center text-primary">SXM Quiz</h1>
        <h2 className="headline-large mb-10 text-center text-on-background">
          Test your knowledge of Saint Martin - Are you a local expert or still a tourist?
        </h2>
      </header>
      <div className="flex  gap-4 text-center">
        <button
          className={`px-16 py-4 relative rounded-full text-xl bg-primary 
        text-on-primary active:top-[2px]`}
        >
          Play
        </button>
        <button
          className={`px-16 py-4 relative rounded-full text-xl ring-1 ring-outline 
        text-on-surface active:top-[2px]`}
        >
          Sign up
        </button>
      </div>
    </main>
  );
}
