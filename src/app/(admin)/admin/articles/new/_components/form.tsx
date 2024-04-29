"use client";
import { useFormState } from "react-dom";
import { createArticle } from "../actions";
import { Button, Select, Textarea } from "@aomdev/ui";
import { TitleSlug } from "@/components/title-slug";
import { ImageDropzone } from "@/components/image-dropzone";

export function ArticleForm() {
  const [state, action] = useFormState(createArticle, null);

  return (
    <form
      className="space-y-6"
      action={action}
    >
      <TitleSlug
        name="article"
        slugError={state?.article_slug?.join(" \n")}
        titleError={state?.article_title?.join("\n")}
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
      {state?.article_category?.join("\n")}
      <ImageDropzone />

      <Button
        type="submit"
        fullWidth
      >
        Create article
      </Button>
    </form>
  );
}
