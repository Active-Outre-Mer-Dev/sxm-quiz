import Link from "next/link";

type PropTypes = {
  link: string;
  id: string;
  route: "article" | "quizzes";
};

export function SettingsBreadcrumbs({ link, id, route }: PropTypes) {
  return (
    <p>
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
