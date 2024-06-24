"use client";
import { ArticleHistory as ArticleHistoryType } from "@/types/custom.types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, Badge } from "@aomdev/ui";
import { RestoreHistorySchemaType, deleteHistory, restoreHistory } from "../actions";
import useSWR from "swr";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useActionState } from "@/lib/hooks/use-action-state";
import { toast } from "sonner";

async function fetcher(key: string) {
  const [, slug] = key.split(":");
  console.log(slug);
  const res = await fetch(`/api/article-history?slug=${slug}`);
  const json = await res.json();
  console.log("ran again");
  return json as { data: ArticleHistoryType[] };
}

type PropTypes = {
  activeHistoryId: string
}

export function ArticleHistory({ activeHistoryId }: PropTypes) {
  const params = useParams();
  const { data, mutate } = useSWR(`article-history:${params.slug}`, fetcher);
  if (!data) return null;
  let activeSave = null;
  const nonActiveSaves = [];

  for (const save of data.data) {
    if (save.id === activeHistoryId) {
      activeSave = save
    } else {
      nonActiveSaves.push(save)
    }
  }
  return (
    <>
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
          <ScrollArea
            style={{ height: "65vh", overflowX: "hidden" }}
            className="-m-4"
          >
            <motion.ul
              layout
              className=""
            >
              <AnimatePresence initial={false}>
                {activeSave && <HistoryEntry key={activeSave.id} article={activeSave} isFirst slug={params.slug as string} />}
                {nonActiveSaves.map((article, index) => {
                  return (
                    <HistoryEntry
                      article={article}
                      slug={params.slug as string} key={article.id}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          </ScrollArea>
        </MotionConfig>
      </div>
    </>
  );
}

type Props = {
  article: ArticleHistoryType;
  isFirst?: boolean;
  slug: string;

};

function HistoryEntry({ article, isFirst, slug, }: Props) {
  const router = useRouter();
  const { formAction } = useActionState<RestoreHistorySchemaType>(restoreHistory, {
    onError(message) {
      toast.error(message);
    },
    onSuccess(message) {
      toast.success(message);
      router.push(`/admin/articles/${slug}`);
    }
  });
  const searchParams = useSearchParams();
  const isActive = searchParams.get("history") === article.id;
  return (
    <motion.li
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "96px", opacity: 1 }}
      exit={{ opacity: 0 }}
      data-active={isActive} layoutId={article.id}
      className="hover:bg-gray-600/20 rounded overflow-hidden bg-neutral-900 data-[active=true]:bg-gray-600/20"
    >
      {isFirst ? (
        <div
          className=" overflow-hidden block w-full p-4   h-full "
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold mb-1">{article.created_at}</p>
            <Badge color="success">Active</Badge>
          </div>
          <p className="text-gray-300">{article.content}...</p>
        </div>
      ) :
        isActive ? (
          <form
            action={formAction}
            className="overflow-hidden relative p-4  text-start text-base h-full  w-full "
          >
            <p className="font-semibold mb-1">{article.created_at}</p>
            <p className="text-gray-300">{article.content}...</p>
            <input
              type="hidden"
              name="history_id"
              value={article.id}
            />
            <input
              type="hidden"
              name="article_slug"
              value={slug}
            />
            <button className="text-primary-200 hover:underline absolute right-4 top-4">Restore</button>
          </form>
        ) : (
          <Link
            href={isFirst ? `/admin/articles/${slug}` : `?history=${article.id}`}
            className=" overflow-hidden block w-full p-4   h-full "
          >
            <p className="font-semibold mb-1">{article.created_at}</p>
            <p className="text-gray-300">{article.content}...</p>
          </Link>
        )}P
    </motion.li>
  );
}
