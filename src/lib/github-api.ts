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

export const createBranch = async (title: string) => {
  const sha = await getMainSHA();
  const formattedTitle = title.toLowerCase().replaceAll(" ", "-").trim();
  const data = await octokit.request(`POST /repos/${repoOwner}/${repo}/git/refs`, {
    owner: "Agis Carty",
    repo,
    ref: `refs/heads/${formattedTitle}`,
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

export async function getBranch(title: string): Promise<GetBranch> {
  try {
    const branch = title.toLowerCase().replaceAll(" ", "-").trim();
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

export async function createPullRequest(body: string, title: string, head: string) {
  await octokit.request(`POST /repos/${repoOwner}/${repo}/pulls`, {
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
}

export const github = {
  createBranch,
  createFile,
  createPullRequest,
  getBranch,
  updateFile
};
