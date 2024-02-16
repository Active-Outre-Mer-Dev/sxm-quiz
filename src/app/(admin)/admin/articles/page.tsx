import remarkHtml from "remark-html";
import { remark } from "remark";
import matter from "gray-matter";
import { createClient } from "@/lib/supabase";
import { Button, Table } from "@aomdev/ui";
import { Badge } from "@aomdev/ui";
import { formatDate } from "@/lib/format-date";
import { getCatColor } from "@/get-category-color";
import Link from "next/link";
import { Octokit } from "octokit";
import { Nav } from "../../_components/nav";
const repoOwner = "Active-Outre-Mer-Dev";
const repo = "sxm-quiz";
const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

const getMainSHA = async () => {
  const data = await octokit.request(`GET /repos/${repoOwner}/${repo}/git/ref/heads/main`);
  console.log(data);
  return data.data.object.sha as string;
};

const createBranch = async () => {
  const sha = await getMainSHA();
  const data = await octokit.request(`POST /repos/${repoOwner}/${repo}/git/refs`, {
    owner: "Agis Carty",
    repo,
    ref: "refs/heads/new-api-branch-name",
    sha
  });
  console.log(data.data);
  return data.data.ref.replace("refs/heads/", "") as string;
};

export default async function Page() {
  const { error, data } = await createClient("server_component").from("articles").select("*");
  if (error) throw error;

  const createFile = async () => {
    "use server";
    const branch = await createBranch();
    const message = "This is markdown";
    await octokit.request("PUT /repos/Active-Outre-Mer-Dev/sxm-quiz/contents/src/content/articles/test.md", {
      owner: "Active-Outre-Mer-Dev",
      repo: "sxm-quiz",
      path: "/src/content/articles/test.md",
      message: "testing github api",
      committer: {
        name: "Agis Carty",
        email: "a.carty2555@gmail.com"
      },
      content: Buffer.from(message).toString("base64"),
      branch
    });
  };
  return (
    <>
      <Nav route="home" />
      <main className="container mx-auto">
        <form action={createFile}>
          <Button>Create</Button>
        </form>
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
