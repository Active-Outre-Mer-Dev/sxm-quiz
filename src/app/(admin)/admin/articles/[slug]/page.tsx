import { allArticles } from "contentlayer/generated";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";
import { Skeleton } from "@aomdev/ui";
import { getArticle } from "@/lib/get-articles";

const Tiptap = dynamic(() => import("./_client/editor"), { ssr: false, loading: () => <TiptapLoading /> });

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  unstable_noStore();

  const article = allArticles.find((article) => article.slug === params.slug)!;

  const { error, data } = await getArticle(params.slug);

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
    profile: data.profiles?.profile_image || undefined,
    branch: data.branch
  };

  return (
    <main className="">
      <div>
        <Tiptap
          branch={data.branch}
          imgPath={data.thumbnail_path}
          articleData={articleData}
          slug={params.slug}
          defaultContent={data.status === "beta" ? "" : article.body.html}
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
