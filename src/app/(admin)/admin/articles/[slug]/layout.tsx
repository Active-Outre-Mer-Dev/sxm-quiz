import { Suspense } from "react";
import { Sidebar } from "./sidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ArticleLayout({
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
