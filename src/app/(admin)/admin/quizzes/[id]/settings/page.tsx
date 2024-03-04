import { Card, Title } from "@aomdev/ui";
import { Settings, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
export default function QuizSettings({ params }: { params: { id: string } }) {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto w-1/2 pt-6">
      <Link
        href={`/admin/quizzes/${params.id}/settings/general`}
        className="group"
      >
        <Card
          variant={"outline"}
          className="text-center flex flex-col items-center gap-2 group-hover:text-primary-300 group-hover:ring-primary-300 duration-200 ease-in-out"
        >
          <Settings />
          <Title
            className="font-heading text-3xl"
            order={2}
          >
            General
          </Title>
        </Card>
      </Link>
      <Link
        href={`/admin/quizzes/${params.id}/settings/article-link`}
        className="group"
      >
        <Card
          variant={"outline"}
          className="text-center flex flex-col items-center gap-2 group-hover:text-primary-300 group-hover:ring-primary-300 duration-200 ease-in-out"
        >
          <LinkIcon />
          <Title
            className="font-heading text-3xl"
            order={2}
          >
            Link Articles
          </Title>
        </Card>
      </Link>
    </div>
  );
}
