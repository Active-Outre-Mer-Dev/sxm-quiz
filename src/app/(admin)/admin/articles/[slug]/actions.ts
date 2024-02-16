"use server";
import { Octokit } from "octokit";

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
  return data.data.ref.replace("refs/heads/", "") as string;
};

export const createFile = async (content: string) => {
  "use server";
  //   const branch = await createBranch();
  //   const markdown = new TurnDownService().turndown(content);
  //   console.log(markdown);
  //   await octokit.request("PUT /repos/Active-Outre-Mer-Dev/sxm-quiz/contents/src/content/articles/test.md", {
  //     owner: "Active-Outre-Mer-Dev",
  //     repo: "sxm-quiz",
  //     path: "/src/content/articles/test.md",
  //     message: "testing github api",
  //     committer: {
  //       name: "Agis Carty",
  //       email: "a.carty2555@gmail.com"
  //     },
  //     content: Buffer.from(content).toString("base64"),
  //     branch
  //   });
};
