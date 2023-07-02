import { Title } from "@aomdev/ui";
import { ExternalLinkIcon } from "lucide-react";
import profile from "@/assets/agis.jpg";
import pixel2 from "@/assets/pixel.jpg";
import { TableOfContents } from "./toc";
import { generateContent, getAllMetadata } from "@/lib/get-content";
import { notFound } from "next/navigation";
import { ShareButton } from "./share-article";
import { ExternalLink } from "./external-link";
import { MobileTOC } from "./mobile-toc";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { formatDate } from "@/lib/format-date";

export function generateStaticParams() {
  const slugs = getAllMetadata()!.map(({ slug }) => ({ slug }));
  return slugs;
}

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function Page({ params }: { params: { slug: string; category: string } }) {
  const props = await generateContent(params.slug);
  const { error, data } = await supabase.from("articles").select("*").eq("slug", params.slug).single();

  if (props.error || error) notFound();

  const { content, headings, metadata, readTime } = props;
  const color =
    params.category === "history"
      ? "text-error-600"
      : params.category === "geography"
      ? "text-secondary-600"
      : params.category === "environment"
      ? "text-success-600"
      : "text-tertiary-600";
  return (
    <>
      <ExternalLink />
      <div className="flex gap-2  lg:w-4/6 items-center border-b border-neutral-200 pb-5 mb-10">
        <span className="text-3xl font-medium text-neutral-900">Articles</span>
        <span className="h-10 w-[2px] bg-neutral-900" />
        <span className={`${color} font-medium text-3xl capitalize`}>{params.category}</span>
      </div>
      <div className="mb-16 lg:mb-36 flex gap-7">
        <div className=" lg:basis-4/6">
          <article className="lg:mb-16">
            <div className="mb-10">
              <header className="flex items-center justify-between mb-4">
                <h1 id={"intro"} className={"text-4xl leading-none font-medium font-heading"}>
                  {metadata.title}
                </h1>
                <ShareButton title={metadata.title} />
              </header>
              <p style={{ width: "clamp(36ch, 90%, 75ch)" }} className="text-lg mb-4">
                {metadata.intro}
              </p>
              <span className="text-neutral-600 text-sm block mb-6">
                {formatDate(new Date(data.created_at))} - {readTime} min read
              </span>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <img src={profile.src} width={50} height={50} className="rounded-full object-cover" />
                  <div>
                    <span className="font-medium block text-neutral-800">{metadata.author}</span>
                    <span className="text-neutral-600">SXM Quiz core team</span>
                  </div>
                </div>
                <div>
                  <a
                    target="_blank"
                    href={"https://github.com/bluepnwage"}
                    className="text-primary-500 flex items-center"
                  >
                    Github <ExternalLinkIcon size={16} className="inline-block ml-2" />
                  </a>
                </div>
              </div>
            </div>
            <img src={metadata.thumbnail} alt={""} className={"rounded-xl mb-10"} />
            <MobileTOC headings={headings} {...params} />
            <div
              className={`prose-ul:list-disc prose-headings:font-medium prose-h2:mt-10 prose-lg prose-h2:mb-4
               prose-h2:text-3xl prose-a:text-primary-500`}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </article>
          {/* <div className="space-y-10">
            <Title order={2} className="font-medium font-heading mb-6">
              Related Articles
            </Title>
            <RelatedArticles />
            <RelatedArticles />
            <RelatedArticles />
          </div> */}
        </div>
        <TableOfContents headings={headings} />
      </div>
    </>
  );
}

function RelatedArticles() {
  return (
    <div className="flex gap-4">
      <figure className="basis-1/3 grow aspect-video">
        <img src={pixel2.src} className="w-full h-full  rounded-xl" alt={""} />
      </figure>
      <div className="basis-2/3 grow">
        <Title order={3} className="font-heading font-medium mb-4">
          SXM Geo
        </Title>
        <p className="">
          Minim incididunt aliquip dolor sint ullamco quis deserunt ad est enim deserunt magna in. Nostrud
          irure dolore do sit reprehenderit laborum pariatur quis enim ad cupidatat sint.
        </p>
      </div>
    </div>
  );
}
