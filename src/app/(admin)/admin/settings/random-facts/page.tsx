import { createClient } from "@/lib/supabase";
import { ActionIcon, Title } from "@aomdev/ui";
import { Trash2 } from "lucide-react";
import { FactForm } from "./fact-form";

export default async function RandomFacts() {
  const { data, error } = await createClient("server_component").from("random_facts").select("*");
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
        <ul className="space-y-4">
          {data.map((fact) => {
            return (
              <li
                key={fact.id}
                className="flex items-start justify-between border-b-neutral-700 border-b pb-4"
              >
                {fact.description}
                <form>
                  <ActionIcon>
                    <Trash2 size={"75%"} />
                  </ActionIcon>
                </form>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
