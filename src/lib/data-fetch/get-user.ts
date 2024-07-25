import { Profiles } from "@/types/custom.types";
import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";

type GetUser =
  | {
    error: true;
    message: string;
    data: null;
  }
  | { error: false; message: ''; data: Profiles & { email?: string } };

export const getUser =
  async (): Promise<GetUser> => {
    noStore();
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error)
      return {
        error: true,
        message: "Must be signed in",
        data: null
      };
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();
    if (userError) {
      return {
        error: true,
        message: "There was an error getting your account",
        data: null
      };
    }

    if (userData.role === "admin") {
      return {
        error: false,
        data: { ...userData, email: data.user.email },
        message: ''
      };
    } else {
      return {
        error: false,
        data: { ...userData, email: data.user.email },
        message: ''
      };
    }
  }




