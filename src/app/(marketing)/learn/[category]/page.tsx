import { Title } from "@aomdev/ui";
import { Article } from "../_components/article";
import { createClient } from "@/lib/supabase/server";

const categories = ["history", "geography", "environment", "economy"];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export default async function Page({ params }: { params: { category: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, profiles (*)")
    .eq("category", params.category);
  if (error) throw new Error("There was an error fetching the articles");

  return (
    <div className="min-h-screen mb-20">
      <Title
        order={1}
        className="font-heading text-center capitalize mb-10 font-medium"
      >
        {params.category} Articles
      </Title>
      <section className="w-full b mb-36 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10">
        {data.map((article) => {
          return (
            <Article
              {...article}
              key={article.slug}
            />
          );
        })}
      </section>
    </div>
  );
}
