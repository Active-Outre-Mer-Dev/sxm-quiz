import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="display-large mb-2 text-on-background">SXM Quiz</h1>
      <h2 className="display-medium mb-10 text-center text-on-background">
        Test your knowledge of Saint Martin - Are you a local expert or still a tourist?
      </h2>
      <p className="headline-large mb-4 text-on-background">Choose a category</p>
      <div className="flex flex-col gap-4 text-center">
        <button
          className={`px-16 py-4 relative rounded-full text-xl bg-primary 
        text-on-primary active:top-[2px]`}
        >
          Play
        </button>
      </div>
    </main>
  );
}
