"use client";

import { FormButton } from "@/components/form-button";
import { ProfileDropzone } from "@/components/profile-dropzone";
import { useActionState } from "@/lib/hooks/use-action-state";
import { Alert, TextInput } from "@aomdev/ui";
import { UserSchemaType, updateUser } from "./actions";
import { toast } from "sonner";

type PropTypes = {
  profile_image: string;
  first_name: string;
  last_name: string;
};

export function UserForm({ first_name, last_name, profile_image }: PropTypes) {
  const { formAction, state } = useActionState<UserSchemaType>(updateUser, {
    onSuccess(message) {
      toast.success(message);
    },
    onError(message) {
      toast.error(message);
    }
  });
  return (
    <>
      <form
        className="w-1/2 mx-auto  space-y-4 mb-20"
        action={formAction}
      >
        <ProfileDropzone defaultImg={profile_image || ""} />

        <TextInput
          label="First name"
          name="first_name"
          defaultValue={first_name || ""}
          error={state.inputErrors?.first_name?.join("\n")}
        />
        <TextInput
          label="Last name"
          name="last_name"
          defaultValue={last_name || ""}
          error={state.inputErrors?.last_name?.join("\n")}
        />
        <FormButton fullWidth>Submit</FormButton>
      </form>
    </>
  );
}
