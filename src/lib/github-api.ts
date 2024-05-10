import { Octokit } from "octokit";
import { RequestError } from "octokit";
export const repoOwner = "Active-Outre-Mer-Dev";
export const repo = "sxm-quiz";
export const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

export const getMainSHA = async () => {
  const data = await octokit.request(`GET /repos/${repoOwner}/${repo}/git/ref/heads/main`);
  console.log(data);
  return data.data.object.sha as string;
};

export const createBranch = async (slug: string) => {
  const sha = await getMainSHA();
  const data = await octokit.request(`POST /repos/${repoOwner}/${repo}/git/refs`, {
    owner: "Agis Carty",
    repo,
    ref: `refs/heads/${slug}`,
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

type GetBranch =
  | {
      error: false;
      branch: string;
      sha: string;
    }
  | {
      error: true;
      message: string;
    };

export async function getBranch(branch: string | null): Promise<GetBranch> {
  try {
    if (!branch)
      return {
        error: true,
        message: "No Branch"
      };
    const response = await octokit.request(`GET /repos/${repoOwner}/${repo}/branches/${branch}`, {
      owner: repoOwner,
      repo: repo,
      branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    return {
      branch: response.data.name,
      sha: response.data.commit.sha,
      error: false
    } as const;
  } catch (error) {
    if (error instanceof RequestError) {
      return {
        error: true,
        message: error.message
      };
    } else {
      return {
        error: true,
        message: "An error ocurred"
      };
    }
  }
}

export async function deleteBranch(branch: string | null) {
  try {
    if (!branch)
      return {
        error: true,
        message: "Bruh"
      };
    await octokit.request(`DELETE /repos/${repoOwner}/${repo}/git/refs/heads/${branch}`, {
      owner: "OWNER",
      repo: "REPO",
      ref: "REF",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    return {
      error: false,
      message: " Branch deleted"
    };
  } catch (error) {
    return {
      error: true,
      message: "Failed to delete branch"
    };
  }
}

export const createFile = async (options: Omit<Props, "title">) => {
  await octokit.request(`PUT /repos/${repoOwner}/${repo}/contents/src/content/articles/${options.slug}.md`, {
    owner: repoOwner,
    repo,
    path: `/src/content/articles/${options.slug}.md`,
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

const updateFile = async (options: Omit<Props, "title">) => {
  await octokit.request(`PUT /repos/${repoOwner}/${repo}/contents/src/content/articles/${options.slug}.md`, {
    owner: repoOwner,
    repo,
    path: `/src/content/articles/${options.slug}.md`,
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

export async function createPullRequest(body: string, title: string, head: string) {
  const res = await octokit.request(`POST /repos/${repoOwner}/${repo}/pulls`, {
    owner: repoOwner,
    repo,
    body,
    title,
    head,
    base: "main",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  return res.data.number as number;
}

export const github = {
  createBranch,
  createFile,
  createPullRequest,
  getBranch,
  updateFile,
  deleteBranch
};
