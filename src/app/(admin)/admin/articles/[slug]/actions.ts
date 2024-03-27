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

const createBranch = async (title: string) => {
  const sha = await getMainSHA();
  const data = await octokit.request(`POST /repos/${repoOwner}/${repo}/git/refs`, {
    owner: "Agis Carty",
    repo,
    ref: `refs/heads/${title}`,
    sha
  });
  return { branch: data.data.ref.replace("refs/heads/", "") as string, sha };
};

type Props = {
  content: string;
  slug: string;
  sha: string;
  branch: string;
  commitMessage: string;
  title: string;
};

const updateFile = async (options: Omit<Props, "title">) => {
  await octokit.request(`PUT /repos/${repoOwner}/${repo}/contents/src/content/${options.slug}.md`, {
    owner: repoOwner,
    repo,
    path: `/src/content/${options.slug}.md`,
    message: options.commitMessage,
    committer: {
      name: "Agis Carty",
      email: "a.carty2555@gmail.com"
    },
    content: Buffer.from(options.content).toString("base64"),
    sha: options.sha,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    },
    branch: options.branch
  });
};

export const createPullRequest = async (options: Pick<Props, "slug" | "content">, formData: FormData) => {
  const form = Object.fromEntries(formData);
  const content = options.content;
  const commitMessage = form.commit_name.toString() || "";
  const title = form.pr_title.toString() || "";
  const body = form.pr_description.toString() || "";

  const { branch, sha } = await createBranch(options.slug);
  await updateFile({ branch, sha, content, slug: options.slug, commitMessage });

  await octokit.request(`POST /repos/${repoOwner}/${repo}/pulls`, {
    owner: repoOwner,
    repo,
    body,
    title,
    head: branch,
    base: "main",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
};
