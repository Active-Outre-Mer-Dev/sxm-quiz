import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="display-large mb-10">SXM Quiz</h1>
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
