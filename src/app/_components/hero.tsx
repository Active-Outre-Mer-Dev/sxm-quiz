import { GetStarted } from "@/components/home/get-started";
import { Button } from "@/components/home";
import Link from "next/link";
import mesh from "@/assets/hero-mesh.png";
import Image from "next/image";

export function Hero() {
  return (
    <>
      <section
        style={{ height: "calc(100vh - 64px)" }}
        className="bg-neutral-900 block  pt-10 pb-20 relative"
      >
        <Image priority src={mesh} fill alt={""} quality={100} sizes="100vw" className="object-cover  " />
        <div className="w-11/12 lg:w-3/5 text-neutral-100 mx-auto relative dark flex flex-col justify-center h-full gap-4">
          <Link
            href={"/blog/introducing-sxm-quiz"}
            className="w-fit relative rounded-full before:absolute before:-inset-0 before:scale-x-0 before:rounded-full before:opacity-0 hover:before:opacity-100 before:bg-primary-600/40 before:blur-sm before:duration-200 before:ease-out hover:before:scale-x-100"
          >
            <div className="group w-fit relative z-10 cursor-pointer rounded-full border border-neutral-700 bg-neutral-900 px-4 py-1 text-gray-200 duration-200 ease-out hover:border-primary-500">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] ease-out group-hover:translate-x-full group-hover:duration-1000"></span>
              </div>
              Introducing SXM Quiz. <span className="text-primary-300">Read blog →</span>
            </div>
          </Link>
          <h1 className="text-5xl lg:text-7xl text-neutral-50  mb-4 font-heading">
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-primary-400 to-primary-200">
              Discover
            </span>{" "}
            <span className="bg-gradient-to-b  from-white to-gray-200 bg-clip-text text-transparent">
              the island of{" "}
            </span>{" "}
            <br />{" "}
            <span className="bg-gradient-to-b  from-white to-gray-200 bg-clip-text text-transparent">
              Saint Martin
            </span>
          </h1>
          <p className=" text-2xl mb-8">
            Test your knowledge, explore hidden gems, and learn fascinating facts about Saint Martin!{" "}
          </p>
          <div className="  flex  gap-4">
            <GetStarted />
            <Button size={"lg"} variant={"neutral"}>
              Learn more
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
