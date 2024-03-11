import { getCatColor } from "@/get-category-color";
import { createClient } from "@/lib/supabase";
import { Title, Badge, Table, BadgeProps } from "@aomdev/ui";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cookies as nextCookies } from "next/headers";
import { Categories, Quiz, QuizCat } from "@/types/custom.types";
import { ViewSwitch } from "./view-switch";
import QuizBoard from "./kanban-board";

export default async function QuizPage() {
  const supabase = createClient("server_component", true);
  const { error, data } = await supabase.from("quiz").select("*, categories (*)");
  if (error) return <p>Failed to get data</p>;
  const cookies = nextCookies();
  const isChecked = cookies.get("board-view")?.value === "kanban";
  return (
    <>
      <div className="container mx-auto">
        <header className="flex items-center justify-between  mb-10 my-10">
          <Title
            order={1}
            className="font-heading font-semibold text-4xl"
          >
            Quizzes
          </Title>
          <div className="flex gap-4">
            <Link
              href={"/admin/quizzes/new"}
              className={buttonStyles({ className: "" })}
            >
              <Plus
                size={16}
                className="inline-block mr-2"
              />
              Add
            </Link>
          </div>
        </header>
        <ViewSwitch defaultChecked={isChecked} />
        {!isChecked ? <QuizTable data={data} /> : <QuizBoard quizzes={data} />}
      </div>
    </>
  );
}

type Props = {
  data: QuizCat[];
};

function QuizTable({ data }: Props) {
  return (
    <Table className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Category</Table.Head>
          <Table.Head>Type </Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Completions </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((quiz) => {
          const quizType = quiz.type.replaceAll("_", " ");
          const publishedColor: BadgeProps["color"] =
            quiz.status === "published" ? "success" : quiz.status === "beta" ? "secondary" : "error";
          return (
            <Table.Row key={quiz.id}>
              <Table.Cell className="font-medium">{quiz.title}</Table.Cell>
              <Table.Cell className="capitalize">
                <Badge color={quiz.categories?.color as BadgeProps["color"]}>{quiz.categories?.title}</Badge>
              </Table.Cell>
              <Table.Cell className="capitalize">{quizType}</Table.Cell>
              <Table.Cell className="capitalize">
                <Badge color={publishedColor}>{quiz.status}</Badge>
              </Table.Cell>
              <Table.Cell>{quiz.completions}</Table.Cell>
              <Table.Cell>
                <Link href={`/admin/quizzes/${quiz.id}`}>Edit</Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
