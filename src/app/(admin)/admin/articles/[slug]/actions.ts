"use server";
import { github } from "@/lib/github-api";

type Props = {
  content: string;
  slug: string;
  sha: string;
  branch: string;
  commitMessage: string;
  title: string;
};

export const createPullRequest = async (options: Pick<Props, "slug" | "content">, formData: FormData) => {
  const form = Object.fromEntries(formData);
  const content = options.content;
  const commitMessage = form.commit_name.toString() || "";
  const title = form.pr_title.toString() || "";
  const body = form.pr_description.toString() || "";

  const branchData = await github.getBranch(options.slug);
  let branch = "";
  let sha = "";

  if (branchData.error) {
    const data = await github.createBranch(options.slug);
    branch = data.branch;
    sha = data.sha;
  } else {
    branch = branchData.branch;
    sha = branchData.sha;
  }

  await github.updateFile({ branch, sha, content, slug: options.slug, commitMessage });
  await github.createPullRequest(body, title, branch);
};
