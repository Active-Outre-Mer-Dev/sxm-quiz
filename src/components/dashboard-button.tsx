import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

export async function DashboardButton() {
  const client = createClient("server_component");
  const { data, error } = await client.auth.getUser();
  if (error) return null;
  return (
    <Link className={buttonStyles({ variant: "neutral", size: "sm" })} href={"/admin"}>
      Account
    </Link>
  );
}
