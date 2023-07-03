import { Button } from "@/components/home";
import Image from "next/image";
import photo from "@/assets/article-demo.png";
import { FeatureList } from "./_components/feature-list";
import { Hero } from "./_components/hero";
import gradient from "@/assets/contribute-gradient.png";
import { WindowFrame } from "@aomdev/ui";

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeatureList />
      <section className="mx-auto relative  pb-20 bg-white pt-10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent
        via-primary-400 to-transparent `}
        />
        <h2
          className={`text-center text-3xl lg:text-5xl font-medium mb-10 font-heading
        bg-gradient-to-b from-neutral-600 to-neutral-900 bg-clip-text text-transparent `}
        >
          Unveil the essence of Saint Martin
        </h2>
        <p
          style={{ width: "clamp(36ch, 90%, 50ch)" }}
          className="text-center mx-auto text-lg lg:text-2xl mb-4 "
        >
          Written articles by the community to teach you everything about the island!
        </p>
        <Button variant={"neutral"} className="block mx-auto mb-5 ">
          Get started
        </Button>
        <WindowFrame classNames={{ body: "p-0" }} className="mx-auto w-11/12 lg:w-2/4 ">
          <figure className="relative aspect-video">
            <Image src={photo} alt={""} fill className="object-cover" />
          </figure>
        </WindowFrame>
      </section>
      <section className="py-20 relative flex flex-col items-center gap-6 bg-neutral-900 text-white">
        <Image src={gradient.src} alt={""} fill sizes={"100vw"} quality={100} className=" object-cover" />
        <h2
          className={`text-center text-4xl lg:text-6xl font-medium  font-heading relative bg-gradient-to-b 
        from-white to-gray-200 bg-clip-text text-transparent`}
        >
          Become a contributor
        </h2>
        <p
          className="text-center relative text-lg lg:text-2xl text-gray-100"
          style={{ width: "clamp(36ch, 90%, 50ch)" }}
        >
          Have some knowledge you&apos;d like to share with the island? Look no further! Become a contributor
          today and join our community!
        </p>
        <Button variant="neutral" className="text-primary-600 relative">
          Learn more
        </Button>
      </section>
    </main>
  );
}
