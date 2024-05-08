"use client";
import { Button, Dialog, DialogProps, TextInput, Textarea } from "@aomdev/ui";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { createPullRequest } from "../actions";

type PropTypes = {
  content: string;
  branch: string | null;
} & DialogProps;

export function PullRequestDialog({ content, branch, ...props }: PropTypes) {
  const params = useParams();
  return (
    <Dialog {...props}>
      <Dialog.Content className="w-2/5">
        <div className="flex justify-between mb-2">
          <Dialog.Title>Create Pull Request</Dialog.Title>
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        <form
          className="space-y-4"
          action={async (form) => {
            await createPullRequest({ content, slug: params.slug as string, branch }, form);
            if (props.onOpenChange) {
              props?.onOpenChange(false);
            }
          }}
        >
          <TextInput
            label="Title"
            name="pr_title"
          />
          <TextInput
            label="Commit name"
            name="commit_name"
          />
          <Textarea
            label="Description"
            name="pr_description"
          />
          <Button className="ml-auto">Submit</Button>
        </form>
      </Dialog.Content>
    </Dialog>
  );
}
