import { Title } from "@aomdev/ui";
import { Button } from "@/components/learn";
import { RandomFacts } from "./random-facts";
import { Articles } from "./article-list";

export default function Page() {
  return (
    <>
      <section className="mb-20 container mx-auto">
        <Title order={1} className="font-heading text-neutral-800 text-center leading-none mb-2">
          Lessons
        </Title>
        <p className="text-2xl text-center text-neutral-600">For Saint Martiners, by Saint Martiners</p>
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles category="history" title="Featured" />
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles category="history" title="Recently added" />
      </section>
      <section className="mb-36">
        <RandomFacts />
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles category="history" title="All" />
      </section>

      <section className="mb-36">
        <div className="radial-gradient p-4 w-11/12 lg:w-3/4 mx-auto text-primary-50  rounded-xl">
          <Title order={2} className="font-heading mb-2">
            Become a contributor
          </Title>
          <p style={{ width: "clamp(36ch, 90%, 64ch)" }} className="text-xl mb-4">
            Have some knowledge you&apos;d like to share with the island? Look no further! Become a
            contributor today and join our community!
          </p>
          <Button variant="neutral" className="text-primary-600">
            Get started
          </Button>
        </div>
      </section>
      <section className="w-11/12 lg:container mx-auto mb-36">
        <Articles category="history" title="Community" />
      </section>
    </>
  );
}
