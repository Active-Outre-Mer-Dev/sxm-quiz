import { getUser } from "@/lib/get-user";
import { Title } from "@aomdev/ui";
import { notFound } from "next/navigation";
import { UserForm } from "./form";

export default async function UserProfile() {
  const { error, data } = await getUser("server_component");
  if (error) notFound();

  return (
    <>
      <Title
        order={1}
        className="font-heading mx-auto text-3xl  font-bold w-fit "
      >
        Profile
      </Title>
      <UserForm
        first_name={data.first_name || ""}
        last_name={data.last_name || ""}
        profile_image={data.profile_image || ""}
      />
    </>
  );
}
