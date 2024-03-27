import { getCatColor } from "@/get-category-color";
import { formatDate } from "@/lib/format-date";
import { createClient } from "@/lib/supabase";
import { Badge, Table } from "@aomdev/ui";
import Link from "next/link";

export default async function Page() {
  const { error, data } = await createClient("server_component").from("articles").select("*");
  if (error) throw error;

  return (
    <>
      <main className="container mx-auto">
        <Table className="w-full mt-20">
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
