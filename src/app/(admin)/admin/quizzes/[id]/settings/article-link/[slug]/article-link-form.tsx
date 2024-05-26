"use client";
import { useActionState } from "@/lib/hooks/use-action-state";
import { Button } from "@aomdev/ui";
import { Link, Unlink } from "lucide-react";
import { useParams } from "next/navigation";
import { ArticleLinkSchemaType, toggleLinkAction } from "./actions";
import { toast } from "sonner";

type PropTypes = {
  isLinked: boolean;
};

export function ArticleLinkForm({ isLinked }: PropTypes) {
  const params = useParams();
  const { formAction } = useActionState<ArticleLinkSchemaType>(toggleLinkAction.bind(null, isLinked), {
    onSuccess(message) {
      toast.success(message);
    },
    onError(message) {
      toast.error(message);
    }
  });
  return (
    <form
      className=""
      action={formAction}
    >
      <input
        hidden
        type="hidden"
        name="article_slug"
        value={params.slug}
      />
      <input
        hidden
        type="hidden"
        name="quiz_id"
        value={params.id}
      />
      <Button size={"sm"}>
        {isLinked ? (
          <>
            <Unlink
              size={16}
              className="inline-block mr-2"
            />{" "}
            Unlink
          </>
        ) : (
          <>
            <Link
              size={16}
              className="inline-block mr-2"
            />{" "}
            Link
          </>
        )}{" "}
        article
      </Button>
    </form>
  );
}
