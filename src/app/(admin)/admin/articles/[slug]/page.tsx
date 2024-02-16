import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import Tiptap from "./editor";
import { Card } from "@aomdev/ui";

type Metadata = {
  title: string;
  author: string;
};

const fetchArticle = async (slug: string) => {
  const res = await fetch(
    `https://github.com/Active-Outre-Mer-Dev/sxm-quiz/raw/main/src/content/articles/${slug}.md`
  );

  const text = await res.text();
  const metadata = matter(text);

  return {
    content: (await remark().use(remarkHtml).process(metadata.content)).toString(),
    metadata: metadata.data as Metadata
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { content, metadata } = await fetchArticle(params.slug);
  console.log(content);
  return (
    <main className="container mx-auto">
      <Tiptap content={content} />
    </main>
  );
}
