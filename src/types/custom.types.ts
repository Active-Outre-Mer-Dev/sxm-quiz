export type ArticleProps = {
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
