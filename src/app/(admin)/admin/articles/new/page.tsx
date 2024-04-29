import { Title } from "@aomdev/ui";
import { ArticleForm } from "./_components/form";

export default function NewArticle() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title
          order={1}
          className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight "
        >
          Create new article
        </Title>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ArticleForm />
      </div>
    </div>
  );
}
