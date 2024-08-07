import { Title } from "@aomdev/ui";
import { FactContainer } from "./fact-container";
import { getRandomFacts } from "@/lib/data-fetch/get-random-facts";

export default async function RandomFacts() {
  const data = await getRandomFacts()
  const sorted = data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return (
    <div className="my-16 mx-auto container w-2/4">
      <FactContainer facts={sorted}>
        <Title
          order={1}
          className="font-heading text-4xl font-semibold mb-8 text-gray-900 dark:text-gray-50"
        >
          All facts
        </Title>
      </FactContainer>
    </div>
  );
}
