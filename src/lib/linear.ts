import { LinearClient } from "@linear/sdk";

const apiKey = process.env.LINEAR_PERSONAL_TOKEN!;
const linear = apiKey ? new LinearClient({ apiKey }) : null;

const projectId = "87b015c6-bccb-450f-b5d6-b4a42fe94229";
const teamId = "f60ef876-38d7-4543-8e6e-86ee7715366e";

export async function createIssue(title: string, description: string) {
  try {
    if (!linear) throw new Error("Must provide api key");
    const labels = await linear.issueLabels();
    const allLabels = labels.nodes.filter(label => label.name === "User created" || label.name === "Bug");
    await linear.createIssue({
      teamId,
      title,
      description,
      projectId,
      labelIds: allLabels.map(label => label.id)
    });
    return { error: false, message: "Issue created." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: true, message: error.message, stack: error };
    } else {
      return { error: true, message: "An error occurred", stack: error };
    }
  }
}
