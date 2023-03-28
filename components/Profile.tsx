import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Suspense, lazy } from "react";
import { UserProfile } from "./UserProfile";
import SignIn from "./SignUp";

export async function Profile() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      {session && session.user && <UserProfile user={session.user} />}
      {!session && <SignIn />}
    </>
  );
}
