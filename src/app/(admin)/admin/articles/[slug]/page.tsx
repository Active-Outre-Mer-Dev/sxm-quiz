import { Title } from "@aomdev/ui";
import Tiptap from "./_client/editor";
import { allArticles } from "contentlayer/generated";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = allArticles.find((article) => article.slug === params.slug)!;

  const articleData = {
    title: article.title,
    author: article.author,
    category: article.category,
    intro: article.intro,
    thumbnail: article.thumbnail,
    profile: article.profile
  };

  return (
    <main className="p-2">
      <div
        style={{ zIndex: 9999 }}
        className="flex items-center border-b justify-between border-b-neutral-700 mb-4 z-50 bg-neutral-900"
      >
        <Title
          order={1}
          className="font-bold text-2xl font-heading capitalize my-2"
        >
          {article.title}
        </Title>
      </div>
      <Tiptap
        articleData={articleData}
        slug={params.slug}
        defaultContent={article.body.html}
      />
    </main>
  );
}
