import styles from "./page.module.css";
import Link from "next/link";
import { Test } from "./test";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="display-large mb-2">SXM Quiz</h1>
      <h2 className="display-medium mb-10 text-center">
        Test your knowledge of Saint Martin - Are you a local expert or still a tourist?
      </h2>
      <p className="headline-large">Choose a category</p>
      <div className="flex flex-col gap-4 text-center">
        <Link href={"/quiz/general"} className="text-secondary">
          General questions
        </Link>
        <Link href={"/quiz/geography"} className="text-secondary">
          Geography questions
        </Link>
      </div>
    </main>
  );
}
