import { ArticleFilter } from "../_components/article-filter";

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex mt-20 gap-10">
      <div className="basis-1/5">
        <ArticleFilter />
      </div>
      <div className="basis-4/5">{children}</div>
    </div>
  );
}
