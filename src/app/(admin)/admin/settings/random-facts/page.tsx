import { createClient } from "@/lib/supabase";
import { Title } from "@aomdev/ui";
import { FactForm } from "./fact-form";
import { Fact } from "./fact";

export default async function RandomFacts() {
  const { data, error } = await createClient("server_component")
    .from("random_facts")
    .select("description, id")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return (
    <div className="mt-16 mx-auto container w-2/4">
      <FactForm />
      <div>
        <Title
          order={1}
          className="font-heading text-4xl font-semibold mb-8"
        >
          All facts
        </Title>
        <ul className="space-y-8">
          {data.map((fact) => {
            return (
              <Fact
                {...fact}
                key={fact.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
