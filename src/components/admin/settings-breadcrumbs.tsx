import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
type PropTypes = {
  link: string;
  id: string;
  route: "article" | "quizzes";
};

export async function SettingsBreadcrumbs({ link, id, route }: PropTypes) {
  const { data, error } = await createClient()
    .from("quiz")
    .select("title")
    .eq("id", id)
    .single();
  if (error) throw error;
  return (
    <p>
      <Link
        href={`/admin/${route}`}
        className="capitalize hover:text-primary-300"
      >
        {route}
      </Link>
      {" > "}
      <Link
        href={`/admin/${route}/${id}`}
        className="hover:text-primary-300"
      >
        {data.title}
      </Link>{" "}
      {" > "}
      <Link
        className="hover:text-primary-300"
        href={`/admin/${route}/${id}/settings`}
      >
        Settings
      </Link>{" "}
      {">"} {link}
    </p>
  );
}
