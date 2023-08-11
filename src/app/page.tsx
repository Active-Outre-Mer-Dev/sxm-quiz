import { Button } from "@/components/home";
import Image from "next/image";
import photo from "@/assets/article-demo.png";
import { FeatureList } from "./_components/feature-list";
import { Hero } from "./_components/hero";
import { Badge, WindowFrame } from "@aomdev/ui";
import { Avatar } from "@/components/avatar";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

export default async function Home() {
  const [firstBlog] = allBlogs;
  return (
    <main>
      <Hero />
      <FeatureList />
      <section className="mx-auto relative  pb-36 bg-white pt-20 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent
        via-primary-400 to-transparent `}
        />
        <h2
          className={`text-center text-3xl lg:text-5xl font-medium mb-6 font-heading
        bg-gradient-to-b from-gray-600 to-gray-900 bg-clip-text text-transparent `}
        >
          Unveil the essence of Saint Martin
        </h2>
        <p
          style={{ width: "clamp(36ch, 90%, 50ch)" }}
          className="text-center mx-auto text-lg lg:text-2xl mb-8 "
        >
          Written articles by the community to teach you everything about the island!
        </p>
        <Button variant={"neutral"} className="block mx-auto mb-20 ">
          Get started
        </Button>
        <WindowFrame classNames={{ body: "p-0" }} className="mx-auto w-11/12 lg:w-4/5 overflow-hidden">
          <figure className="relative aspect-video">
            <Image src={photo} alt={""} fill className="object-cover" />
          </figure>
        </WindowFrame>
      </section>
      <section className="py-20 relative flex flex-col items-center gap-6 bg-neutral-900 text-white mb-36">
        <h2
          className={`text-center text-4xl lg:text-6xl font-medium  font-heading relative bg-gradient-to-b 
        from-white to-gray-200 bg-clip-text text-transparent`}
        >
          Become a contributor
        </h2>
        <p
          className="text-center relative text-lg lg:text-xl text-gray-100 mb-4"
          style={{ width: "clamp(36ch, 90%, 75ch)" }}
        >
          Have some knowledge you&apos;d like to share with the island? Look no further! Become a contributor
          today and join our community!
        </p>
        <Button variant="neutral" className="text-primary-600 relative block mb-6">
          Learn more
        </Button>
        <div className="flex flex-col lg:flex-row gap-0.5 w-3/5 rounded-2xl overflow-hidden">
          <div className="bg-neutral-800 grow flex flex-col items-center gap-2 py-6">
            <span className="font-heading font-semibold text-3xl text-gray-100">11</span>
            <span className="font-medium text-lg text-gray-200">Articles</span>
          </div>
          <div className="bg-neutral-800 grow flex flex-col items-center gap-2 py-6">
            <span className="font-heading font-semibold text-3xl text-gray-100">2</span>
            <span className="font-medium text-lg text-gray-200">Contributors</span>
          </div>
          <div className="bg-neutral-800 grow flex flex-col items-center gap-2 py-6">
            <span className="font-heading font-semibold text-3xl text-gray-100">4</span>
            <span className="font-medium text-lg text-gray-200">Categories</span>
          </div>
        </div>
      </section>
      <section className="w-11/12 lg:container mx-auto mb-20">
        <header className="mb-16 text-center">
          <h2
            className={`text-center text-3xl lg:text-5xl font-medium mb-6 font-heading
          bg-gradient-to-b from-gray-600 to-gray-900 bg-clip-text text-transparent `}
          >
            From the blog
          </h2>
          <p className="text-lg lg:text-2xl text-gray-700">See what&apos;s next for SXM quiz</p>
        </header>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8">
          <Link href={`/blog/${firstBlog.slug}`} className="group">
            <figure className="aspect-video relative mb-2 overflow-hidden">
              <Image
                src={firstBlog.thumbnail}
                alt=""
                fill
                className="object-cover group-hover:scale-105 duration-500 ease-out"
              />
            </figure>
            <div className="flex gap-4 items-center">
              <time className="text-gray-600 text-sm">{firstBlog.date}</time>
              <Badge>{firstBlog.category}</Badge>
            </div>
            <h3 className="font-heading group-hover:text-primary-500 font-medium text-3xl mb-2">
              {firstBlog.title}
            </h3>
            <p className="mb-4">{firstBlog.intro}</p>
            <div className="flex gap-2 items-center">
              <Avatar />
              <div>
                <span className="font-medium block">{firstBlog.author}</span>
                <span className="text-gray-600">{firstBlog.position}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
