import fs from "fs";
import path from "path";
import html from "remark-html";
import matter from "gray-matter";
import { remark } from "remark";
import format from "date-fns/fp/format";
import { headingTree } from "./get-headings";

type ArticleData = {
  type: string;
  slug: string;
  title: string;
  author: string;
  intro: string;
  creationDate: string;
  thumbnail: string;
};

const contentFolder = path.join(process.cwd(), "src", "content");

export function getAllMetadata() {
  const files = fs.readdirSync(contentFolder).filter(file => file.endsWith(".md"));
  const metadata = files.map(file => {
    const fileData = fs.readFileSync(path.join(contentFolder, file), "utf8");
    const data = getMetadata(fileData, file);
    return { slug: data.metadata.slug, data };
  });
  return metadata;
}

function getCreationDate(file: string, folder?: "articles" | "blogs") {
  const stat = fs.statSync(path.join(contentFolder, folder || "", file));
  return format("PP")(stat.mtime);
}

function getMetadata(fileData: string, file: string, folder?: "articles" | "blogs") {
  const { content, data } = matter(fileData);
  data.slug = file.replace(".md", "");
  data.creationDate = getCreationDate(file, folder);
  return { metadata: data as ArticleData, content };
}

export type Heading = {
  value: string;
  data: { hProperties: { id: string } };
};

function getReadTime(str: string) {
  if (str === null || str === "") return 0;
  else str = str.toString();
  const wpm = 225;
  const words = str
    .replace(/(<([^>]+)>)/gi, "")
    .trim()
    .replaceAll("\n", " ")
    .split(" ")
    .filter(s => s);
  return Math.ceil(words.length / wpm);
}

type Content =
  | {
      error: true;
      message: string;
    }
  | { error: false; readTime: number; headings: Heading[] };

export async function getHeadings(slug: string, folder: "articles" | "blogs"): Promise<Content> {
  try {
    const file = `${slug}.md`;
    const fileData = fs.readFileSync(path.join(contentFolder, folder, file), "utf-8");
    const data = getMetadata(fileData, file, folder);
    const contentHTML = await remark().use(html).use(headingTree).process(data.content);
    return {
      headings: contentHTML.data.headings as Heading[],
      readTime: getReadTime(contentHTML.toString()),
      error: false
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: true, message: error.message };
    }
    return { error: true, message: "An error occurred" };
  }
}
