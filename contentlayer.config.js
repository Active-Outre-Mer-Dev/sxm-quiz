import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { headingTree } from "./src/lib/get-headings";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    intro: { type: "string", required: true },
    thumbnail: { type: "string", required: true },
    category: { type: "string", required: true },
    profile: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: article => `${article._raw.sourceFileName.replace(".md", "")}`
    }
  }
}));

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blogs/**/*.md",
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    intro: { type: "string", required: true },
    thumbnail: { type: "string", required: true },
    category: { type: "string", required: true },
    profile: { type: "string", required: false },
    position: { type: "string", required: false },
    date: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: article => `${article._raw.sourceFileName.replace(".md", "")}`
    }
  }
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Article, Blog],
  markdown: { remarkPlugins: [headingTree] }
});
