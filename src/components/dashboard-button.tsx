import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { getUser } from "@/lib/get-user";
import { unstable_noStore } from "next/cache";

export async function DashboardButton() {
  unstable_noStore();
  const { error, data } = await getUser("server_component");
  if (error) return null;

  return (
    <>
      <Link
        className={buttonStyles({ variant: "neutral", size: "sm" })}
        href={data.role === "admin" ? "/admin" : "/dashboard"}
      >
        Account
      </Link>
    </>
  );
}
