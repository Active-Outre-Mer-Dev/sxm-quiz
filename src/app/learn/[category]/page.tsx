import { Title } from "@aomdev/ui";
import { Articles } from "../article-list";
const categories = ["history", "geography", "environment", "economy"];
import { getAllMetadata } from "@/lib/get-content";

export function generateStaticParams() {
  return categories.map(category => ({ category }));
}

export default function Page({ params }: { params: { category: string } }) {
  return (
    <div className="min-h-screen">
      <Title order={1} className="font-heading capitalize mb-10 font-medium">
        {params.category} Articles
      </Title>
      <section className="container mx-auto mb-36">
        <Articles type={params.category} category={params.category} />
      </section>
    </div>
  );
}
