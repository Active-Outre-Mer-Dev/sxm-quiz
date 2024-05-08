import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ArticleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <>
      <div className="border-b border-b-neutral-700 py-4 px-4">
        <ul className="flex gap-4">
          <li>
            <Link href={`/admin/articles/${params.slug}`}>Home</Link>
          </li>
          <li>
            {" "}
            <Link href={`/admin/articles/${params.slug}/settings`}>Settings</Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
