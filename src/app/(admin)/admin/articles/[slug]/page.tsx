import { unstable_noStore } from "next/cache";
import nextDynamic from "next/dynamic";
import { Skeleton } from "@aomdev/ui";
import { getArticle } from "@/lib/get-articles";
import { getHistory } from "@/lib/get-history";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Tiptap = nextDynamic(() => import("./_client/editor"), {
  ssr: false,
  loading: () => <TiptapLoading />
});

export default async function ArticlePage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: string | URLSearchParams | Record<string, string> | string[][] | undefined;
}) {
  unstable_noStore();
  const { error, data } = await getArticle(params.slug);
  const search = new URLSearchParams(searchParams);
  const historyId = search.get("history");
  let historyDescripton = "";
  if (historyId) {
    const historyData = await getHistory(historyId);
    if (historyData.status === "success") {
      historyDescripton = historyData.data.content;
    }
  }
  if (error) {
    console.log(error);
    return;
  }

  const articleData = {
    title: data.title || "",
    author: `${data.profiles?.first_name} ${data.profiles?.last_name}`,
    category: data.category,
    intro: data.category,
    thumbnail: data.thumbnail || "",
    profile: data.profiles?.profile_image || undefined
  };

  return (
    <main className="">
      <div>
        <Tiptap
          imgPath={data.thumbnail_path}
          articleData={articleData}
          slug={params.slug}
          defaultContent={historyId ? historyDescripton : data.content || ""}
          published={data.status === "published"}
        />
      </div>
    </main>
  );
}

function TiptapLoading() {
  return (
    <>
      <div className="basis-[80%]">
        <div className="ring-1 min-h-screen ring-gray-700">
          <MenuLoading />
        </div>
      </div>
    </>
  );
}

function MenuLoading() {
  return (
    <div className=" border-b flex justify-between items-center bg-neutral-900 z-10 border-b-gray-700 h-16 px-4 sticky top-0 left-0">
      <div className="flex gap-4">
        <div className="flex gap-1">
          <Skeleton
            className="h-6 w-6 rounded-full"
            animate
          />
          <Skeleton
            className="h-6 w-6 rounded-full"
            animate
          />
          <Skeleton
            className="h-6 w-6 rounded-full"
            animate
          />
        </div>
        <div className="flex gap-1">
          <Skeleton
            className="h-6 w-6 rounded-full"
            animate
          />
          <Skeleton
            className="h-6 w-6 rounded-full"
            animate
          />
        </div>
      </div>
    </div>
  );
}
