"use server";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function signOut() {
  const client = createClient("server_action");
  const { error } = await client.auth.signOut();
  if (!error) redirect("/");
  redirect("/");
}
