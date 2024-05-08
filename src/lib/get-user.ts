import { createClient } from "./supabase";
import type { User } from "@/types/custom.types";

type GetUserType =
  | {
      error: true;
      message: string;
      userData: null;
    }
  | {
      error: false;
      userData: User;
    };

export async function getUser(env: Parameters<typeof createClient>[0]): Promise<GetUserType> {
  const supabase = createClient(env);
  const { data, error } = await supabase.auth.getUser();
  if (error)
    return {
      error: true,
      message: "Must complete profile before you can create articles",
      userData: null
    };
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (userError) throw userError;
  return {
    error: false,
    userData
  };
}
