import { unstable_noStore } from "next/cache";
import { CustomDialog } from "./custom-dialog";
import { ArticleForm } from "./_client/article-form";
import { getArticle } from "@/lib/get-articles";

export default async function Page({ params }: { params: { slug: string } }) {
  unstable_noStore();
  const { data, error } = await getArticle(params.slug);
  if (error) throw error;
  return (
    <CustomDialog open>
      <ArticleForm article={data} />
    </CustomDialog>
  );
}
