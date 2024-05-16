"use client";
import { ArticleSchemaType, createArticle } from "../actions";
import { Select, Textarea } from "@aomdev/ui";
import { TitleSlug } from "@/components/title-slug";
import { ImageDropzone } from "@/components/image-dropzone";
import { useActionState } from "@/lib/hooks/use-action-state";
import { FormButton } from "@/components/form-button";

export function ArticleForm() {
  const { formAction, state } = useActionState<ArticleSchemaType>(createArticle);

  return (
    <form
      className="space-y-6"
      action={formAction}
    >
      <TitleSlug
        name="article"
        slugError={state?.inputErrors?.article_slug?.join(" \n")}
        titleError={state?.inputErrors?.article_title?.join("\n")}
      />
      <Textarea
        label="Description"
        name="article_description"
      />
      <Select
        name="article_category"
        fullWidth
        items={[
          { label: "History", value: "history" },
          { label: "Geography", value: "geography" },
          { label: "Economy", value: "economy" },
          { label: "Environment", value: "environment" }
        ]}
      />
      <ImageDropzone />

      <FormButton
        type="submit"
        fullWidth
      >
        Create article
      </FormButton>
    </form>
  );
}
