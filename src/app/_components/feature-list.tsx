import { Title, WindowFrame, Skeleton } from "@aomdev/ui";
import { QuizDemo } from "./quiz-demo";
import { Suspense } from "react";
import { GradientText } from "@/components/gradient-text";
import { Book, LayoutDashboard, LayoutList } from "lucide-react";

export function FeatureList() {
  return (
    <>
      <section className="mx-auto grid grid-cols-2 pb-36 bg-white gap-10  w-11/12 lg:container  relative">
        <div>
          <header className="mb-10">
            <Title order={2} className="font-medium font-heading">
              <GradientText>Features</GradientText>
            </Title>
            <p className="text-xl leading-7">
              Aliquip Lorem incididunt est ex ut cillum occaecat fugiat irure eu. Commodo est deserunt do ea.
            </p>
          </header>
          <ul className="space-y-8 leading-7">
            <li className="relative pl-12">
              <span
                aria-hidden="true"
                className="bg-primary-200/30 top-0 left-0 mr-2 absolute rounded-full w-9 h-9  text-primary-600 inline-flex items-center justify-center"
              >
                <Book size={16} />
              </span>
              <p className="inline-block">
                <span className="font-semibold text-gray-900">Learn as you play.</span> Say goodbye to mundane
                study sessions and hello to immersive learning! Our app allows you to learn as you play. Each
                question you encounter is an opportunity to expand your knowledge about Saint Martin.
              </p>
            </li>
            <li className="relative pl-12">
              <span
                aria-hidden="true"
                className="bg-primary-200/30 top-0 left-0 mr-2 absolute rounded-full w-9 h-9  text-primary-600 inline-flex items-center justify-center"
              >
                <LayoutList size={16} />
              </span>
              <p>
                <span className="font-semibold text-gray-900">Multiple categories.</span> We believe in
                catering to diverse interests. That's why our quiz app covers a wide range of topics related
                to Saint Martin. Explore the facets of Saint Martin that intrigue you the most and dive deep
                into its rich tapestry of information.
              </p>
            </li>
            <li className="relative pl-12">
              <span
                aria-hidden="true"
                className="bg-primary-200/30 top-0 left-0 mr-2 absolute rounded-full w-9 h-9  text-primary-600 inline-flex items-center justify-center"
              >
                <LayoutDashboard size={16} />
              </span>
              <p>
                <span className="font-semibold text-gray-900">Variety of quizzes.</span> Variety is the spice
                of life, and we've made sure to sprinkle it generously in our app. Challenge yourself with a
                mix of quiz formats, including multiple choice, true or false, fill in the blanks, and more.
                Each quiz presents a unique set of questions, keeping you engaged and motivated throughout
                your learning journey.
              </p>
            </li>
          </ul>
        </div>
        <QuizDemo />
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
      <WindowFrame heading="General history" className="relative h-full">
        {props.children}
      </WindowFrame>
    </div>
  );
}
