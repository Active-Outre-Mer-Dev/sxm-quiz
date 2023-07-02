import { Title, WindowFrame, Skeleton } from "@aomdev/ui";
import { QuizDemo } from "./quiz-demo";
import { Suspense } from "react";

export function FeatureList() {
  return (
    <>
      <section className="pb-36 bg-white pt-16 lg:pt-24  relative">
        <div className="w-11/12 lg:container mx-auto flex flex-col gap-20 lg:gap-36">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="basis-1/2">
              <Title
                order={2}
                className="bg-gradient-to-b mb-8 text-4xl lg:text-5xl font-heading font-medium from-neutral-600 to-neutral-900 bg-clip-text text-transparent"
              >
                Learn as you play
              </Title>
              <p style={{ width: "calc(36ch, 90%, 72ch)" }} className="text-lg leading-relaxed">
                Say goodbye to mundane study sessions and hello to immersive learning! Our app allows you to
                learn as you play. Each question you encounter is an opportunity to expand your knowledge
                about Saint Martin.
              </p>
            </div>
            <FramerWrapper>
              <p className="font-heading font-medium text-2xl mb-2 text-neutral-900">
                When was St Martin discovered?
              </p>
              <ul className="space-y-4">
                <li>
                  <div className={`rounded-md p-2 bg-success-700 text-white`}>1493</div>
                  <p className="text-sm mt-2">
                    Christopher Columbus discovered and named Saint Martin on November 11, 1493 without ever
                    setting foot on the island.
                  </p>
                </li>
                <li>
                  <div className={`rounded-md p-2 bg-white  border border-neutral-100`}>1492</div>
                </li>
                <li>
                  <div className={`rounded-md p-2 bg-white  border border-neutral-100`}>1648</div>
                </li>
                <li>
                  <div className={`rounded-md p-2 bg-error-600 text-white borde`}>1297</div>
                </li>
              </ul>
            </FramerWrapper>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="basis-1/2 hidden lg:block">
              <FramerWrapper>
                <div className="grid lg:grid-cols-3 gap-x-2 gap-y-4 ">
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                </div>
              </FramerWrapper>
            </div>
            <div className="basis-1/2">
              <Title order={2} className=" mb-8 text-4xl lg:text-5xl font-heading font-medium ">
                <span className="bg-gradient-to-b from-neutral-600 to-neutral-900 bg-clip-text text-transparent">
                  Multiple Topics,
                </span>{" "}
                <br />
                <span className="bg-gradient-to-b from-neutral-600 to-neutral-900 bg-clip-text text-transparent">
                  Endless Exploration
                </span>
              </Title>
              <p style={{ width: "calc(36ch, 90%, 72ch)" }} className="text-lg leading-relaxed">
                We believe in catering to diverse interests. That&apos;s why our quiz app covers a wide range
                of topics related to Saint Martin. Explore the facets of Saint Martin that intrigue you the
                most and dive deep into its rich tapestry of information.
              </p>
            </div>
            <div className="basis-1/2  lg:hidden">
              <FramerWrapper>
                <div className="grid lg:grid-cols-3 gap-x-2 gap-y-4 ">
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                  <div className="hidden lg:block rounded-md border border-neutral-100 p-1">
                    <p className="font-medium text-xl font-heading mb-4">SXM Geography</p>
                    <Skeleton rounded className="h-2 w-4/5 mb-1" />
                    <Skeleton rounded className="h-2 w-2/4 mb-1" />
                    <Skeleton rounded className="h-2 w-2/3 mb-1" />
                  </div>
                </div>
              </FramerWrapper>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="basis-1/2">
              <Title order={2} className=" mb-8 text-4xl lg:text-5xl font-heading font-medium ">
                <span className="bg-gradient-to-b from-neutral-600 to-neutral-900 bg-clip-text text-transparent">
                  Variety of quizzes
                </span>{" "}
              </Title>
              <p style={{ width: "calc(36ch, 90%, 72ch)" }} className="text-lg leading-relaxed">
                Variety is the spice of life, and we&apos;ve made sure to sprinkle it generously in our app.
                Challenge yourself with a mix of quiz formats, including multiple choice, true or false, fill
                in the blanks, and more. Each quiz presents a unique set of questions, keeping you engaged and
                motivated throughout your learning journey.
              </p>
            </div>
            <Suspense fallback={null}>
              <QuizDemo />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
type PropTypes = {
  children: React.ReactNode;
};

function FramerWrapper(props: PropTypes) {
  return (
    <div className=" basis-1/2 relative ">
      <div className="absolute inset-0 blur-md bg-neutral-200"></div>
      <WindowFrame className="relative h-full">{props.children}</WindowFrame>
    </div>
  );
}
