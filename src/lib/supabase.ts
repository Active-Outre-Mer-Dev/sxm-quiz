import { Database } from "@/types/database.types";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient(type: "server_component" | "server_action", isAdmin = false) {
  const cookieStore = cookies();
  switch (type) {
    case "server_action": {
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        isAdmin ? process.env.SUPABASE_SERVICE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.set({ name, value: "", ...options });
            }
          }
        }
      );
      return supabase;
    }
    case "server_component": {
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        isAdmin ? process.env.SUPABASE_SERVICE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            }
          }
        }
      );
      return supabase;
    }
    default: {
      throw new Error("Must specify client type");
    }
  }
}
