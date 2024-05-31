import { signOut } from "@/app/(admin)/_components/actions";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form action={signOut}>
      <button className="hover:dark:bg-neutral-600/30 hover:bg-neutral-200/30 w-full p-2 rounded text-start">
        <LogOut
          size={16}
          className="inline-block mr-2"
        />
        Logout
      </button>
    </form>
  );
}
