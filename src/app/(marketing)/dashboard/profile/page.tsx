import { ImageDropzone } from "@/components/image-dropzone";
import { ProfileDropzone } from "@/components/profile-dropzone";
import { getUser } from "@/lib/get-user";
import { createClient } from "@/lib/supabase";
import { uploadImage } from "@/lib/upload-image";
import { Button, TextInput, Title } from "@aomdev/ui";
import { notFound } from "next/navigation";
import { z } from "zod";

const UserSchema = z.object({
  first_name: z.string(),
  last_name: z.string()
});

export default async function UserProfile() {
  const { error, data } = await getUser("server_component");
  if (error) notFound();
  const updateUser = async (formData: FormData) => {
    "use server";
    const { data, error } = await getUser("server_action");
    if (error) throw error;
    const schema = UserSchema.safeParse(Object.fromEntries(formData));
    if (schema.success) {
      let profile = "";
      let profilePath = "";

      const image = formData.get("default_image")?.toString();
      if (!image) {
        const newImage = formData.get("image") as File;
        const { path, url } = await uploadImage(newImage, `users/${data.id}`);
        profile = url;
        profilePath = path;
      } else {
        profile = image;
      }
      const newData: Record<string, string> = {
        ...schema.data
      };
      if (profile) {
        newData.profile_image = profile;
      }
      if (profilePath) {
        newData.profile_path = profilePath;
      }
      await createClient("server_action").from("profiles").update(newData).eq("id", data.id);
    }
  };
  return (
    <>
      <Title
        order={1}
        className="font-heading mx-auto text-3xl  font-bold w-fit "
      >
        Profile
      </Title>
      <form
        className="w-1/2 mx-auto  space-y-4 mb-20"
        action={updateUser}
      >
        <ProfileDropzone defaultImg={data.profile_image || ""} />

        <TextInput
          label="First name"
          name="first_name"
          defaultValue={data.first_name || ""}
        />
        <TextInput
          label="Last name"
          name="last_name"
          defaultValue={data.last_name || ""}
        />
        <Button fullWidth>Submit</Button>
      </form>
    </>
  );
}
