"use client";
import { signOut } from "next-auth/react";
import type { DefaultSession } from "next-auth";
import { Button } from "./Button";

type PropTypes = {
  user: DefaultSession["user"];
};

export function UserProfile({ user }: PropTypes) {
  return (
    <div className="space-x-4">
      <span className="inline">{user?.name}</span>
      <img src={user?.image || ""} width={35} height={35} alt={""} className="rounded-full inline" />
      <Button intent={"secondary"} className="inline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}
