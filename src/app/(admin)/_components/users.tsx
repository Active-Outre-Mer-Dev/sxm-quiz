import { Avatar } from "@/components/avatar";
import { getUser } from "@/lib/get-user";
import { Skeleton } from "@aomdev/ui";
import Link from "next/link";

export async function User() {
  const data = await getUser();
  if (data.error) return null;
  return (
    <Link href={'/dashboard'} className="flex items-center gap-2 hover:bg-gray-200/30  p-4">
      <Avatar
        size={40}
        src={data.data?.profile_image || ""}
      />
      <span className="flex flex-col items-start">
        <span className="font-medium">
          {data.data?.first_name} {data.data?.last_name}
        </span>
        <span className="dark:text-gray-300 text-gray-600">{data.data.email}</span>
      </span>
    </Link>
  );
}

export function UserLoading() {
  return (
    <div className="flex items-center gap-2 p-4">
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
