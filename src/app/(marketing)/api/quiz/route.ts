import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const PUT = async (req: Request) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const json = await req.json();
  console.log(json);
  const completions = json.completions as number;
  const score = json.score as number;

  if (!json.id || !json.score) {
    return new Response(JSON.stringify({ message: "Must provide slug and score." }), {
      status: 400,
      headers
    });
  }

  const updatePromise = supabase.from("quiz").update({ completions }).eq("id", json.id);
  const insertPromise = supabase.from("scores").insert({ quiz_id: json.id, score });

  const [{ error }, { error: insertError }] = await Promise.all([updatePromise, insertPromise]);

  if (error || insertError) console.log("An error occurred");

  return new Response(JSON.stringify({ message: "Updated" }), {
    status: 200,
    headers
  });
};
