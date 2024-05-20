import { Title } from "@aomdev/ui";
import { createClient } from "@/lib/supabase";
import { CreateQuizForm } from "./form";

export default async function Page() {
  const { data, error } = await createClient("server_component").from("categories").select("*");
  if (error) throw error;

  const selectItems = data.map((cat) => ({ label: cat.title, value: cat.id }));

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title
            order={1}
            className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight "
          >
            Create new quiz
          </Title>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <CreateQuizForm selectItems={selectItems} />
        </div>
      </div>
    </>
  );
}
