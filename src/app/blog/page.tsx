import Image from "next/image";
import asset from "@/assets/pixel.jpg";
import { Badge, Title } from "@aomdev/ui";
import { Avatar } from "@/components/avatar";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Title order={1} className="text-center mb-16 lg:mb-20 font-medium font-heading">
        Blog
      </Title>
      <div className="grid lg:grid-cols-3 gap-x-10 gap-y-20 w-11/12 lg:container mx-auto mb-36">
        <Link
          href={"/blog/introducing-sxm-quiz"}
          className="group flex flex-col lg:flex-row gap-4 col-span-full"
        >
          <figure className="basis-1/2 relative aspect-video rounded-md overflow-hidden">
            <Image
              src={asset}
              className="w-full h-full group-hover:scale-105 duration-200 ease-out"
              fill
              alt=""
            />
          </figure>
          <div className="basis-1/2 grow space-y-4">
            <Title order={2} className="mb-2 group-hover:text-primary-500 font-medium font-heading">
              Introducing SXM Quiz
            </Title>
            <p className="text-xl">
              Commodo sunt incididunt enim laborum exercitation est irure ad ex laboris. Esse sunt qui magna
              duis officia dolor irure est laborum.
            </p>
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-4">
                <Avatar size={64} />
                <div>
                  <span className="block  font-medium">Agis Carty</span>
                  <span className="block  text-neutral-600">{formatDate(new Date())}</span>
                </div>
              </div>
              <Badge color={"error"}>Product update</Badge>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
