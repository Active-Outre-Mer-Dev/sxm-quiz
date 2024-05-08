import { Title } from "@aomdev/ui";
import { unstable_noStore } from "next/cache";
import { getArticle } from "@/lib/get-articles";

export default async function ArticleSettings({ params }: { params: { slug: string } }) {
  unstable_noStore();
  const { error } = await getArticle(params.slug);
  if (error) throw new Error("Bruh");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title
          order={1}
          className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight "
        >
          Settings for article
        </Title>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
    </div>
  );
}
