import { Avatar } from "@/components/avatar";
import { getUser } from "@/lib/get-user";

export async function User() {
  const data = await getUser("server_component", true);
  if (data.error) return null;
  return (
    <div className="flex items-center gap-2 ">
      <Avatar
        size={40}
        src={data.data?.profile_image || ""}
      />
      <span className="flex flex-col items-start">
        <span className="font-medium">
          {data.data?.first_name} {data.data?.last_name}
        </span>
        <span className="text-gray-300">{data.data.email}</span>
      </span>
    </div>
  );
}
