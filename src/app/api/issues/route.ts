import { createIssue } from "@/lib/linear";

export async function POST(req: Request) {
  const json = await req.json();
  const data = await createIssue(json.title, json.description);
  if (data.error) {
    return new Response(JSON.stringify({ message: data.message, stack: data.stack }), { status: 500 });
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
}
