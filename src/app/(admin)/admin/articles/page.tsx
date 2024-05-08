import { getCatColor } from "@/get-category-color";
import { formatDate } from "@/lib/format-date";
import { Badge, Table } from "@aomdev/ui";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { Plus } from "lucide-react";
import { getArticles } from "@/lib/get-articles";

export default async function Page() {
  const { error, data } = await getArticles();
  if (error) throw error;

  return (
    <>
      <main className="container mx-auto mt-20">
        <Link
          href={"articles/new"}
          className={buttonStyles({ className: "w-fit ml-auto block mb-8" })}
        >
          <Plus
            size={16}
            className="inline-block mr-2"
          />
          New
        </Link>
        <Table className="w-full ">
          <Table.Header>
            <Table.Row>
              <Table.Head>Slug</Table.Head>
              <Table.Head>Category</Table.Head>
              <Table.Head>Views</Table.Head>
              <Table.Head>Created</Table.Head>
              <Table.Head>Updated</Table.Head>
              <Table.Head>Published</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((article) => {
              return (
                <Table.Row key={article.slug}>
                  <Table.Cell>{article.slug}</Table.Cell>
                  <Table.Cell className="capitalize">
                    <Badge color={getCatColor(article.category)}>{article.category}</Badge>
                  </Table.Cell>
                  <Table.Cell>{article.views}</Table.Cell>
                  <Table.Cell>{formatDate(new Date(article.created_at))}</Table.Cell>
                  <Table.Cell>{formatDate(new Date(article.updated_at))}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      className="capitalize"
                      color={article.status === "published" ? "success" : "warn"}
                    >
                      {article.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/admin/articles/${article.slug}`}>Edit</Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </main>
    </>
  );
}
