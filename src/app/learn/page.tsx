import { Title } from "@aomdev/ui";
import { Button } from "@/components/learn";
import { RandomFacts } from "./_components/random-facts";
import { Articles } from "./_components/article-list";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { allArticles } from "contentlayer/generated";
import { AllArticlesList } from "./_components/all-articles";
import { Suspense } from "react";

export const revalidate = 60 * 60;

export type Article = {
  title: string;
  thumbnail: string;
  intro: string;
  category: string;
  author: string;
  profile: string | undefined;
  created_at: string;
  slug: string;
  featured: boolean;
  community: boolean;
  views: number;
};

export default async function Page() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { global: { fetch } }
  );

  const { data, error } = await supabase
    .from("articles")
    .select("created_at, slug, featured, community, views");
  if (error) throw new Error("There was an error fetching the articles");

  const articles = allArticles.map(({ slug, title, thumbnail, intro, category, author, profile }) => {
    const articleMetadata = data.find(
      article => article.slug.toLowerCase().trim() === slug.trim().toLowerCase()
    );
    if (!articleMetadata) throw new Error(`Must add ${slug} article metadata to supabase`);
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

  const featuredArticles = articles.filter(({ featured }) => featured).slice(0, 3);
  const communityArticles = articles.filter(({ community }) => community);
  const recentArticles = articles.slice(0, 3).sort((a, b) => {
    return Date.parse(a.created_at) - Date.parse(b.created_at);
  });
  return (
    <>
      <section className="mb-20 container mx-auto">
        <Title
          order={1}
          className="font-heading text-gray-900 dark:text-gray-50 text-center leading-none mb-2"
        >
          Lessons
        </Title>
        <p className="text-2xl text-center ">For Saint Martiners, by Saint Martiners</p>
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles articles={featuredArticles} title="Featured" />
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles articles={recentArticles} title="Recently added" />
      </section>
      <section className="mb-36">
        <RandomFacts />
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Suspense fallback={null}>
          <AllArticlesList articles={articles} />
        </Suspense>
      </section>

      <section className="mb-36">
        <div className="radial-gradient p-4 w-11/12 lg:w-3/4 mx-auto text-primary-50  rounded-xl">
          <Title order={2} className="font-heading mb-2">
            Become a contributor
          </Title>
          <p style={{ width: "clamp(36ch, 90%, 64ch)" }} className="text-xl mb-4">
            Have some knowledge you&apos;d like to share with the island? Look no further! Become a
            contributor today and join our community!
          </p>
          <Button variant="neutral" className="text-primary-600">
            Get started
          </Button>
        </div>
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles articles={communityArticles} title="Community" />
      </section>
    </>
  );
}
