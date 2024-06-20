"use client";
import { ArticleHistory as ArticleHistoryType } from "@/types/custom.types";
import { useParams } from "next/navigation";
import { ScrollArea } from "@aomdev/ui";
import { deleteHistory } from "../actions";
import useSWR from "swr";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

async function fetcher(key: string) {
  const [, slug] = key.split(":");
  console.log(slug);
  const res = await fetch(`/api/article-history?slug=${slug}`);
  const json = await res.json();
  console.log("ran again");
  return json as { data: ArticleHistoryType[] };
}

export function ArticleHistory() {
  const params = useParams();
  const { data, mutate } = useSWR(`article-history:${params.slug}`, fetcher);
  if (!data) return null;
  return (
    <div>
      <form
        action={async (formData) => {
          await deleteHistory(formData);
          mutate();
        }}
        className="flex justify-between items-center mb-6"
      >
        <p className="font-semibold text-lg">History</p>
        <button className="text-sm text-primary-300">Clear history</button>
        <input
          type="hidden"
          name="slug"
          value={params.slug}
        />
      </form>
      <MotionConfig transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
        <motion.ul
          layout
          className="space-y-4"
        >
          <ScrollArea
            style={{ height: "65vh", overflowX: "hidden" }}
            className="-m-4"
          >
            <AnimatePresence initial={false}>
              {data.data.map((article) => {
                return (
                  <motion.li
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={article.id}
                    className="hover:bg-primary-600/30 rounded  cursor-pointer bg-neutral-900"
                  >
                    <div className="p-4 overflow-hidden ">
                      <p className="font-semibold mb-1">{article.created_at}</p>
                      <p className="text-gray-300">{article.content}...</p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ScrollArea>
        </motion.ul>
      </MotionConfig>
    </div>
  );
}
