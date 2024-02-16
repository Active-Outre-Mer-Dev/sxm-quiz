import Image from "next/image";
import { Badge, Title } from "@aomdev/ui";
import { Avatar } from "@/components/avatar";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import { Author } from "@/components/author";

export default function Page() {
  return (
    <main>
      <header className="mb-16 lg:mb-20">
        <Title order={1} className="text-center mb-2  font-medium font-heading">
          Blog
        </Title>
        <p className="text-xl text-center">Get updates and insights about SXM Quiz!</p>
      </header>
      <div className="grid lg:grid-cols-3 gap-x-10 gap-y-20 w-11/12 lg:container mx-auto mb-36">
        {allBlogs.map(blog => {
          return (
            <Link key={blog.slug} href={"/blog/introducing-sxm-quiz"} className="group flex flex-col gap-4 ">
              <figure className="basis-1/2 relative aspect-video rounded-md overflow-hidden">
                <Image
                  src={blog.thumbnail}
                  className="w-full h-full group-hover:scale-105 duration-500 ease-out"
                  fill
                  alt=""
                />
              </figure>

              <div className="basis-1/2 grow space-y-4">
                <div className="flex gap-6 items-center">
                  <time className=" text-gray-600 dark:text-gray-300">{blog.date}</time>
                  <Badge color={"error"}>{blog.category}</Badge>
                </div>
                <Title
                  order={2}
                  className="mb-2 group-hover:text-primary-500 group-hover:dark:text-primary-200 font-medium font-heading"
                >
                  {blog.title}
                </Title>
                <p className="text-lg">{blog.intro}</p>
                <Author name={blog.author} position={blog.position} img={blog.profile} />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
