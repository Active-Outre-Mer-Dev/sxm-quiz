import { getCatColor } from "@/get-category-color";
import { createClient } from "@/lib/supabase";
import { Title, Badge } from "@aomdev/ui";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { Table } from "@aomdev/ui";
import type { BadgeProps } from "@aomdev/ui";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Nav } from "../../_components/nav";

export default async function QuizPage() {
  const supabase = createClient("server_component", true);
  const { error, data } = await supabase.from("quiz").select("*");
  if (error) return <p>Failed to get data</p>;
  console.log(data);
  return (
    <>
      <Nav route="home" />
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
        <Table className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Category</Table.Cell>
              <Table.Cell>Type </Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Completions </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((quiz) => {
              const color = getCatColor(quiz.category);
              const quizType = quiz.type.replaceAll("_", " ");
              const publishedColor: BadgeProps["color"] =
                quiz.status === "published" ? "success" : quiz.status === "beta" ? "secondary" : "error";
              return (
                <Table.Row key={quiz.id}>
                  <Table.Cell className="font-medium">{quiz.title}</Table.Cell>
                  <Table.Cell className="capitalize">
                    <Badge color={color}>{quiz.category}</Badge>
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
      </div>
    </>
  );
}
