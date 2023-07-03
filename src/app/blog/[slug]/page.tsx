import { formatDate } from "@/lib/format-date";
import { ActionIcon } from "./client";
import { ExternalLink, Share } from "lucide-react";
import { Avatar } from "@/components/avatar";
import asset from "@/assets/pixel.jpg";

export default function Page() {
  return (
    <>
      <div className="flex gap-2 w-11/12 lg:w-3/6 mx-auto mt-10 lg:mt-20 items-center border-b border-neutral-200 pb-5 mb-10">
        <span className="text-2xl font-medium text-neutral-900">Blogs</span>
        <span className="h-10 w-[2px] bg-neutral-900" />
        <span className={`text-error-600 font-medium text-2xl capitalize`}>Product update</span>
      </div>
      <div className="mb-16 lg:mb-36 flex gap-7 w-11/12 lg:w-3/6 mx-auto">
        <div>
          <article className="lg:mb-16">
            <div className="mb-10">
              <header className="flex items-center justify-between mb-4">
                <h1 id={"intro"} className={"text-4xl mb-5 lg:text-6xl leading-none font-medium font-heading"}>
                  Introducing SXM Quiz
                </h1>
                <div className="gap-2 flex">
                  <ActionIcon aria-label="Share" color={"primary"} size={"lg"}>
                    <Share aria-hidden="true" size={"50%"} />
                  </ActionIcon>
                </div>
              </header>
              <p style={{ width: "clamp(36ch, 90%, 75ch)" }} className="text-lg mb-4">
                Culpa duis ullamco dolore officia sunt fugiat magna ad nisi anim. Deserunt nostrud laborum
                excepteur laborum aute veniam irure in magna nisi laborum in nisi. Sit et reprehenderit
                aliquip consectetur id qui enim ex velit fugiat reprehenderit adipisicing velit eu. Tempor
                sint deserunt elit id pariatur incididunt nisi labore incididunt. Ea do ipsum ullamco laboris
                velit consectetur voluptate amet. Est minim amet sunt non fugiat elit sunt consectetur
                laborum.
              </p>
              <span className="text-neutral-600 text-sm block mb-6">
                {formatDate(new Date())} - {2} min read
              </span>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Avatar size={50} />
                  <div>
                    <span className="font-medium block text-neutral-800">Agis Carty</span>
                    <span className="text-neutral-600">SXM Quiz core team</span>
                  </div>
                </div>
                <div>
                  <a
                    target="_blank"
                    href={"https://github.com/bluepnwage"}
                    className="text-primary-500 flex items-center"
                  >
                    Github <ExternalLink size={16} className="inline-block ml-2" />
                  </a>
                </div>
              </div>
            </div>
            <img src={asset.src} alt={""} className={"rounded-xl mb-10"} />
            <p className="text-lg">
              Reprehenderit nulla culpa deserunt ipsum officia. Sunt in nisi irure culpa Lorem nulla ullamco
              irure. Cupidatat officia velit magna eiusmod fugiat tempor qui in voluptate aute. Officia elit
              ullamco eiusmod ullamco adipisicing voluptate ad incididunt. Id nostrud aute sint aute.
            </p>
            <br />
            <p className="text-lg">
              Nulla officia ex eu culpa voluptate sunt voluptate mollit deserunt. Adipisicing qui nisi laboris
              officia culpa sunt deserunt duis commodo ea pariatur irure. Ea incididunt reprehenderit deserunt
              reprehenderit pariatur ipsum. Voluptate mollit laborum aliqua commodo qui proident tempor
              proident magna sint dolore reprehenderit amet quis. Labore esse labore et nulla cillum sint ex.
              Officia ea excepteur fugiat sint pariatur laborum do. Nulla officia ex eu culpa voluptate sunt
              voluptate mollit deserunt. Adipisicing qui nisi laboris officia culpa sunt deserunt duis commodo
              ea pariatur irure. Ea incididunt reprehenderit deserunt reprehenderit pariatur ipsum. Voluptate
              mollit laborum aliqua commodo qui proident tempor proident magna sint dolore reprehenderit amet
              quis. Labore esse labore et nulla cillum sint ex. Officia ea excepteur fugiat sint pariatur
              laborum do.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
