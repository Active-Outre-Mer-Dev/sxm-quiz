import { Avatar } from "@/components/avatar";
import { getUser } from "@/lib/get-user";
import { Skeleton } from "@aomdev/ui";

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

export function UserLoading() {
  return (
    <div className="flex items-center gap-2 ">
      <Skeleton
        className="h-10 w-10"
        rounded
        animate
      />
      <span className="flex flex-col items-start gap-2">
        <Skeleton
          className="h-3 w-16"
          rounded
          animate
        />

        <Skeleton
          className="h-3 w-28"
          rounded
          animate
        />
      </span>
    </div>
  );
}
