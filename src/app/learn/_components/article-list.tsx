import { Title } from "@aomdev/ui";
import { Article } from "./article";
import type { Article as ArticleType } from "../page";

type PropTypes = {
  title?: "Community" | "Featured" | "Recently added" | "All";
  type?: string;
  articles: ArticleType[];
};

export async function Articles({ title, articles }: PropTypes) {
  return (
    <>
      {title && (
        <Title order={2} id={title} className="font-heading mb-10">
          {title} articles
        </Title>
      )}

      {articles.length === 0 && (
        <Title order={2} className="font-heading mb-10">
          Coming soon
        </Title>
      )}
      <div className="grid lg:grid-cols-3 gap-x-8 gap-y-16">
        {articles.map(article => {
          const [firstName, lastName] = article.author.split(" ");
          return <Article key={article.slug} article={article} initials={`${firstName[0]}${lastName[0]}`} />;
        })}
      </div>
    </>
  );
}
