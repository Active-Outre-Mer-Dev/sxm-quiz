"use client";
import { Button, PasswordInput, Alert } from "@aomdev/ui";
import { FormEvent, useState, useEffect } from "react";
import { updatePassword } from "./actions";
import { useActionState } from "@/lib/hooks/use-action-state";
import type { PasswordSchemaType } from "./actions";

export function PasswordForm() {
  const { state, formAction } = useActionState<PasswordSchemaType>(updatePassword);

  const [passwords, setPasswords] = useState({ new_password: "", confirm_password: "" });
  useEffect(() => {
    if (state?.status === "success") {
      alert("Password updated");
      setPasswords({ confirm_password: "", new_password: "" });
    }
  }, [state?.status]);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const isNotEqual = passwords.confirm_password !== passwords.new_password;

  return (
    <form
      className="w-2/4 space-y-6"
      action={formAction}
    >
      {state?.status === "error" && <Alert color="error">{state.message}</Alert>}
      <PasswordInput
        label="New password"
        name="new_password"
        value={passwords.new_password}
        onChange={handleChange}
        error={state?.inputErrors ? `${state?.inputErrors?.new_password?.join("\n")}` : ""}
      />
      <PasswordInput
        label="Confirm password"
        name="confirm_password"
        value={passwords.confirm_password}
        onChange={handleChange}
        error={
          isNotEqual
            ? "Passwords are not the same"
            : state?.inputErrors
            ? `${state?.inputErrors?.new_password?.join("\n")}`
            : ""
        }
      />
      <Button disabled={isNotEqual || !passwords.new_password}>Save</Button>
    </form>
  );
}
