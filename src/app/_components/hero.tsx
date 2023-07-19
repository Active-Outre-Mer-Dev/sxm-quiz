import { GetStarted } from "@/components/home/get-started";
import { Button } from "@/components/home";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { GradientText } from "@/components/gradient-text";

export function Hero() {
  return (
    <>
      <section className="relative isolate px-6 mb-16 pb-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <Link
              href={"/blog/introducing-sxm-quiz"}
              className="relative group duration-150 ease-out bg-white rounded-full text-primary  px-3 py-1 text-sm leading-6 text-primary text-gray-600 ring-1 ring-neutral-900/10 hover:ring-primary-500/50"
            >
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-full">
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(45deg,transparent_25%,rgba(212,199,236,.3)_50%,transparent_75%,transparent_100%)] ease-out group-hover:translate-x-full group-hover:duration-1000"></span>
              </div>
              Announcing SXM Quiz.{" "}
              <span className="font-semibold text-primary-500 inline-flex items-center">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more{" "}
                <span aria-hidden="true" className="group-hover:translate-x-0.5 duration-150 ease-out">
                  <ChevronRight size={16} className="text-primary-500" />
                </span>
              </span>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-7xl font-bold font-heading tracking-tight text-gray-900 sm:text-6xl">
              <GradientText>D</GradientText>
              <GradientText>i</GradientText>
              <GradientText>s</GradientText>
              <GradientText>c</GradientText>
              <GradientText>o</GradientText>
              <GradientText>v</GradientText>
              <GradientText>e</GradientText>
              <GradientText>r </GradientText>
              <GradientText>t</GradientText>
              <GradientText>h</GradientText>
              <GradientText>e </GradientText>
              <GradientText>i</GradientText>
              <GradientText>s</GradientText>
              <GradientText>l</GradientText>
              <GradientText>a</GradientText>
              <GradientText>n</GradientText>
              <GradientText>d </GradientText>
              <GradientText>o</GradientText>
              <GradientText>f </GradientText>
              <GradientText>S</GradientText>
              <GradientText>a</GradientText>
              <GradientText>i</GradientText>
              <GradientText>n</GradientText>
              <GradientText>t </GradientText>
              <GradientText>M</GradientText>
              <GradientText>a</GradientText>
              <GradientText>r</GradientText>
              <GradientText>t</GradientText>
              <GradientText>i</GradientText>
              <GradientText>n</GradientText>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              Test your knowledge, explore hidden gems, and learn fascinating facts about Saint Martin!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <GetStarted />
              <Button variant="neutral">
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
      </section>
    </>
  );
}
