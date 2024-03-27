import { Octokit } from "octokit";

export const repoOwner = "Active-Outre-Mer-Dev";
export const repo = "sxm-quiz";
export const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

export const getMainSHA = async () => {
  const data = await octokit.request(`GET /repos/${repoOwner}/${repo}/git/ref/heads/main`);
  console.log(data);
  return data.data.object.sha as string;
};

export const createBranch = async (title: string) => {
  const sha = await getMainSHA();
  const data = await octokit.request(`POST /repos/${repoOwner}/${repo}/git/refs`, {
    owner: "Agis Carty",
    repo,
    ref: `refs/heads/${title}`,
    sha
  });
  return { branch: data.data.ref.replace("refs/heads/", "") as string, sha };
};
