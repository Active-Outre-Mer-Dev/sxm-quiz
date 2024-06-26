"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const client = createClient();
  const { error } = await client.auth.signOut();
  if (!error) redirect("/");
  redirect("/");
}
