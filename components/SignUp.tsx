"use client";
import { signIn } from "next-auth/react";
import { Button } from "./Button";

export default function SignIn() {
  return (
    <Button intent="secondary" onClick={() => signIn()}>
      Sign in
    </Button>
  );
}
