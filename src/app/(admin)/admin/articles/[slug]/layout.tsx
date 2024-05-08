import { Suspense } from "react";
import { Sidebar } from "./sidebar";
import { getArticle } from "@/lib/get-articles";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data, error } = await getArticle(params.slug);
  if (error) throw error;
  return {
    title: data.title
  };
}

export default async function ArticleLayout({
  children,
  settings,
  params
}: {
  children: React.ReactNode;
  settings: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className="flex">
      {" "}
      <div className="basis-[80%]">
        {settings}
        {children}
      </div>
      <Suspense fallback={<p>Loading</p>}>
        <Sidebar slug={params.slug} />
      </Suspense>
    </div>
  );
}
