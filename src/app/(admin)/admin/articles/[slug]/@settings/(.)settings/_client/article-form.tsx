"use client";
import { useFormState } from "react-dom";
import { editArticle } from "../../../settings/actions";
import { Button, Select, Textarea } from "@aomdev/ui";
import { TitleSlug } from "@/components/title-slug";
import { ImageDropzone } from "@/components/image-dropzone";
import { Article } from "@/types/custom.types";

type PropTypes = {
  article: Article;
};

export function ArticleForm({ article }: PropTypes) {
  const [, action] = useFormState(editArticle.bind(null, article.slug, article.thumbnail_path), null);

  return (
    <form
      className="space-y-6"
      action={action}
    >
      <TitleSlug
        defaultTitle={article.title || ""}
        defaultSlug={article.slug}
        name="article"
      />
      <Textarea
        defaultValue={article?.intro || ""}
        label="Description"
        name="article_intro"
      />
      <Select
        defaultValue={article.category}
        name="article_category"
        fullWidth
        items={[
          { label: "History", value: "history" },
          { label: "Geography", value: "geography" },
          { label: "Economy", value: "economy" },
          { label: "Environment", value: "environment" }
        ]}
      />
      <ImageDropzone defaultImg={article.thumbnail || ""} />

      <Button
        type="submit"
        fullWidth
      >
        Update
      </Button>
    </form>
  );
}
