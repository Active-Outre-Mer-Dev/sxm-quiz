import asset from "@/assets/pixel.jpg";
import { Badge } from "@aomdev/ui";
import Image from "next/image";
import { Author } from "./_components/author";
import { ShareMedia } from "./_components/share-media";
import { Newsletter } from "./_components/newsletter";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getHeadings } from "@/lib/get-content";
import { TableOfContents } from "@/components/toc";

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find(blog => blog.slug === params.slug);
  const meta = await getHeadings(params.slug, "blogs");

  if (!blog || meta.error) notFound();

  return (
    <>
      <div className="mb-16 lg:mb-20 mt-16  gap-7 w-11/12 lg:w-4/5 mx-auto">
        <Badge color={"error"} size={"md"} className="mb-4">
          {blog.category}
        </Badge>
        <div>
          <article className="lg:mb-16">
            <div className="mb-10">
              <header className=" mb-4">
                <h1
                  id={"intro"}
                  className={
                    "text-4xl mb-5 lg:text-6xl leading-none text-gray-900 dark:text-gray-50 font-medium font-heading"
                  }
                >
                  {blog.title}
                </h1>
              </header>
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm block mb-6">
                {blog.date} - {meta.readTime} min read
              </span>
              <p
                style={{ width: "clamp(36ch, 90%, 75ch)" }}
                className="text-lg lg:text-xl mb-4 leading-relaxed"
              >
                {blog.intro}
              </p>
            </div>
            <img src={blog.thumbnail} alt={""} className={"rounded-xl mb-10 "} />
            <div className="flex lg:flex-row lg:gap-0 gap-4 flex-col lg:items-end lg:justify-between mb-12 lg:mb-16">
              <Author />
              <ShareMedia />
            </div>
            <div className="flex ">
              <div
                className={`basis-3/4 prose-img:border prose-img:rounded-md prose-img:border-gray-100 prose-ul:list-disc prose-p:w-clamp prose-p:mb-4 prose-headings:font-medium prose-headings:mb-4 prose-h2:mt-12 
                prose-headings:font-heading prose-h2:text-4xl prose-ul:pl-4 text-lg prose-ul:mb-4 prose-a:text-primary-500 prose-a:underline
                prose-a:dark:text-primary-200 prose-img:dark:border-gray-700`}
                dangerouslySetInnerHTML={{ __html: blog.body.html }}
              ></div>
              <TableOfContents headings={meta.headings} />
            </div>
          </article>
        </div>
      </div>
      {/* <Newsletter /> */}
    </>
  );
}
