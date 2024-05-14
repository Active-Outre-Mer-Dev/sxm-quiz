import { Title, Button } from "@aomdev/ui";
import { Alert } from "@aomdev/ui";
import { redirect } from "next/navigation";
import { PasswordForm } from "./password-form";

export default function UserSettings() {
  const deleteAccount = async () => {
    "use server";
    redirect("/account-deleted");
  };

  return (
    <>
      <Title
        order={1}
        className="font-semibold text-4xl font-heading mb-10"
      >
        Settings
      </Title>
      <div>
        <Title
          order={2}
          className="font-heading font-semibold mb-5 text-2xl"
        >
          Update password
        </Title>
        <PasswordForm />
      </div>
      <hr className="h-1 border-neutral-700 w-full my-10" />
      <Alert color="error">
        <div>
          <Title
            order={2}
            className="font-heading font-semibold mb-2 text-2xl text-error-50"
          >
            Delete account
          </Title>
          <p className="mb-10 text-lg text-error-50">Deleting your account is permanent.</p>
          <form
            className="w-1/4 space-y-6"
            action={deleteAccount}
          >
            <Button variant={"error"}>Delete Personal Account</Button>
          </form>
        </div>
      </Alert>
    </>
  );
}
