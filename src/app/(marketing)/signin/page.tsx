import { Button, TextInput } from "@aomdev/ui";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function Component() {
  const signIn = async (form: FormData) => {
    "use server";
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    if (!password || !email) return { error: true };
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold font-heading dark:text-gray-50 ">
            Sign in to your account
          </h2>
        </div>
        <form action={signIn} className="mt-8 space-y-6">
          <input name="remember" type="hidden" value="true" />
          <div>
            <TextInput
              autoComplete="email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              id="email-address"
              name="email"
              required
              type="email"
              label="Email address"
            />
          </div>
          <div>
            <TextInput
              label="Password"
              autoComplete="current-password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link className="font-medium text-gray-300 hover:text-gray-100" href="#">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
