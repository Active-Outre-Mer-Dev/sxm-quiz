'use client'
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { getUser } from "@/lib/get-user";
import { unstable_noStore } from "next/cache";
import useSWR from "swr";

async function fetcher() {

}


export async function DashboardButton() {


  return (
    <>
      {/* <Link
        className={buttonStyles({ variant: "neutral", size: "sm" })}
        href={data.role === "admin" ? "/admin" : "/dashboard"}
      >
        Account
      </Link> */}
    </>
  );
}
