"use client";

import { Button } from "@aomdev/ui";
import { useEditor, EditorContent } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Strikethrough
} from "lucide-react";
import { useState } from "react";
import TurndownService from "turndown";

type PropTypes = {
  content: string;
};

function MenuRow({ children }: { children: React.ReactNode }) {
  return <div className="flex ">{children}</div>;
}

function MenuBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;
  const command = () => editor.chain().focus();
  return (
    <div className="border-b border-gray-700 flex gap-4 h-16 items-center">
      <MenuRow>
        <button
          onClick={() => {
            command().toggleBold().run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Bold size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleItalic().run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Italic size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleStrike().run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Strikethrough size={"75%"} />
        </button>
      </MenuRow>
      <MenuRow>
        <button
          onClick={() => {
            command().toggleHeading({ level: 1 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading1 size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleHeading({ level: 2 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading2 size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleHeading({ level: 3 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading3 size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleHeading({ level: 4 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading4 size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleHeading({ level: 5 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading5 size={"75%"} />
        </button>
        <button
          onClick={() => {
            command().toggleHeading({ level: 6 }).run();
          }}
          className="border border-gray-700 h-6 w-6 flex items-center justify-center rounded"
        >
          <Heading6 size={"75%"} />
        </button>
      </MenuRow>
    </div>
  );
}

function Tiptap({ content }: PropTypes) {
  const [value, setValue] = useState<null | string>("");
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content
  });

  const onSubmit = async () => {
    // const { default: TurndownService } = await import("turndown");
    const markdown = new TurndownService().turndown(editor?.getHTML() || "");
    console.log(markdown);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Button>Submit</Button>
      </form>
      <div className="border border-gray-700 p-4 mt-20">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className={`prose-h1:text-4xl prose-headings:font-heading prose-headings:font-semibold prose-headings:mt-8
        prose-h2:text-3xl prose-headings:mb-4  [&>div]:outline-none focus-within:ring-1 focus-within:ring-primary-500 p-4 `}
        />
      </div>
    </>
  );
} 

export default Tiptap;
