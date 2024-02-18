import { ArticleFilter } from "../_components/article-filter";

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-11/12 lg:container mx-auto flex lg:flex-row flex-col mt-20 gap-10">
      <div className="lg:basis-1/5 grow">
        <ArticleFilter />
      </div>
      <div className="basis-4/5 grow">{children}</div>
    </div>
  );
}
