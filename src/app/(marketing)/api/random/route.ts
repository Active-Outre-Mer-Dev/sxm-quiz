import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const GET = async () => {
  const headers = new Headers();
  headers.set("content-type", "application/json");

  const { data, error } = await supabase.from("quiz").select("slug, category");
  if (error)
    return new Response(JSON.stringify({ message: "An error occurred on the server" }), {
      status: 500,
      headers
    });

  const randomQuiz = data[Math.floor(Math.random() * data.length)];
  return new Response(JSON.stringify({ data: randomQuiz }), { status: 200, headers });
};
