import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./types/database.types";

export async function getAdminSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options
          });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value,
            ...options
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options
          });
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          });
          response.cookies.set({
            name,
            value: "",
            ...options
          });
        }
      }
    }
  );

  const user = await supabase.auth.getUser();
  if (user.error) return false;
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.data.user.id)
    .single();
  if (userError) return false;
  if (userData.role === "admin") return true;
  return false;
}

export default async function middleware(req: NextRequest) {
  const isAdmin = await getAdminSession(req);
  if (isAdmin) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", req.url));
}

export const config = {
  matcher: "/admin/:path*"
};
