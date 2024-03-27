import type { JSONContent } from "@tiptap/react";
import type { Article } from "contentlayer/generated";

export type ArticleData = Omit<Article, "_id" | "_raw" | "body" | "type" | "slug">;

export function createMarkdown(content: JSONContent, data: ArticleData) {
  let markdown = `---
  title: ${data.title}
  author: ${data.author}
  category: ${data.category}
  intro: ${data.intro}
  thumbnail: ${data.thumbnail}
  profile: ${data.profile}
  --- \n
    `;
  if (!content.content) return markdown;
  for (const element of content.content) {
    if (element.type === "paragraph" && element.content) {
      markdown += createParagraph(element.content);
    }
    if (element.type === "heading") {
      markdown += createHeading(element);
    }
  }
  return markdown;
}

function createParagraph(content: JSONContent["content"]) {
  let paragraph = "";
  if (!content) return "\n";
  content!.forEach((e, index) => {
    paragraph += createMarks(e.marks, e.text);
    if (content && index === content.length - 1) {
      paragraph += "\n";
    }
  });
  return paragraph;
}

function createMarks(marks: JSONContent["marks"], text: JSONContent["text"]) {
  if (!marks) return text;
  let formattedText = `${text}`;
  for (const mark of marks) {
    if (mark.type === "bold") formattedText = `**${formattedText}**`;
    if (mark.type === "italic") formattedText = `_${formattedText}_`;
  }
  return formattedText;
}

function createHeading(element: JSONContent) {
  let content = "";
  if (element.content && element.attrs) {
    let hashtags = Array(element.attrs.level).fill("#").join("");

    element.content.forEach((e) => {
      if (e.type === "text") {
        content += `${hashtags} ${e.text} \n`;
      } else if (e.type === "hardBreak") content += " \n";
    });
  }
  return content;
}
