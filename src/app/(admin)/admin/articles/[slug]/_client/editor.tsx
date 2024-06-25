"use client";
import { ArticleData, createMarkdown } from "@/lib/create-markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Menu } from "./menu";
import Link from "@tiptap/extension-link";
import styles from "./editor.module.css";
import { BubbleMenu } from "./bubble-menu";
import { EditorProvider } from "@/components/providers/editor-provider";

type PropTypes = {
  defaultContent: string;
  slug: string;
  articleData: ArticleData;
  imgPath: string | null;
  published: boolean;
};

export type ContentSave = { timestamp: Date; content: string; html: string; id: string; isActive: boolean };

const Tiptap = ({ defaultContent, imgPath, published }: PropTypes) => {
  const editor = useEditor({
    extensions: [StarterKit, Link.extend({ inclusive: false })],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: `prose-headings:font-heading prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl ${styles.editor}`
      }
    }
  });

  useEffect(() => {
    if (editor) {
      const handleCopyShortcut = async (e: KeyboardEvent) => {
        if (e.altKey && e.key === "c") {
          e.preventDefault();
          await navigator.clipboard.writeText(createMarkdown(editor.getJSON()));
        }
      };
      window.addEventListener("keydown", handleCopyShortcut);

      return () => {
        window.removeEventListener("keydown", handleCopyShortcut);
      };
    }
  }, [editor?.isEditable]);

  useEffect(() => {
    editor?.commands.setContent(defaultContent);
  }, [defaultContent]);

  if (!editor) return null;

  return (
    <EditorProvider editor={editor}>
      <div className="basis-[80%]">
        <div className="border-r border-r-neutral-200 dark:border-r-neutral-700 min-h-screen">
          <Menu
            imgPath={imgPath}
            published={published}
          />
          <BubbleMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </EditorProvider>
  );
};

export default Tiptap;
