import { User } from "@/types/custom.types";
import { createClient } from "./supabase";
import { cache } from "react";

type GetUser =
  | {
      error: true;
      message: string;
      data: null;
    }
  | { error: false; message: string; data: User };

export const getUser = cache(
  async (env: Parameters<typeof createClient>[0], checkAdmin?: boolean): Promise<GetUser> => {
    const supabase = createClient(env);
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
    if (checkAdmin) {
      if (userData.role === "admin") {
        return {
          error: false,
          data: userData,
          message: "User must be an admin"
        };
      } else {
        return {
          error: true,
          message: "User is not an admin",
          data: null
        };
      }
    } else {
      return {
        error: false,
        data: userData,
        message: ""
      };
    }
  }
);
