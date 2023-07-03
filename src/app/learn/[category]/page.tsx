import { Title } from "@aomdev/ui";
import { Articles } from "../article-list";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { allArticles } from "contentlayer/generated";

const categories = ["history", "geography", "environment", "economy"];

export function generateStaticParams() {
  return categories.map(category => ({ category }));
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function Page({ params }: { params: { category: string } }) {
  const contentArticles = allArticles.filter(({ category }) => category === params.category);
  const { data, error } = await supabase
    .from("articles")
    .select("created_at, slug, featured, community")
    .eq("category", params.category);
  if (error) throw new Error("There was an error fetching the articles");

  const articles = contentArticles.map(({ slug, title, thumbnail, intro, category, author, profile }) => {
    const articleMetadata = data.find(article => article.slug === slug);
    if (!articleMetadata) throw new Error("Must add article metadata to supabase");
    return {
      ...articleMetadata,
      title,
      thumbnail,
      intro,
      category,
      author,
      profile
    };
  });
  return (
    <div className="min-h-screen mb-20">
      <Title order={1} className="font-heading capitalize mb-10 font-medium">
        {params.category} Articles
      </Title>
      <section className="container mx-auto mb-36">
        <Articles type={params.category} articles={articles} />
      </section>
    </div>
  );
}
