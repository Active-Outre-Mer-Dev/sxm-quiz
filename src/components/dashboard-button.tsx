import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { getUser } from "@/lib/data-fetch/get-user";

export async function DashboardButton() {
  const { error, data } = await getUser()
  if (error) return null
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
