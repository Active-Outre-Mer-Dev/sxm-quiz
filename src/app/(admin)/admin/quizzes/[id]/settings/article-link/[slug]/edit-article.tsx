"use client";
import { createMarkdown } from "@/lib/create-markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Link from "@tiptap/extension-link";
import { EditorProvider } from "@/components/providers/editor-provider";
import { Menu } from "./menu";

type PropTypes = {
  defaultContent: string;
};

export type ContentSave = { timestamp: Date; content: string; html: string; id: string; isActive: boolean };

const Editor = ({ defaultContent }: PropTypes) => {
  const editor = useEditor({
    extensions: [StarterKit, Link.extend({ inclusive: false })],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: `prose-headings:font-heading prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl p-4`
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

  if (!editor) return null;

  return (
    <>
      <EditorProvider editor={editor}>
        <div className="basis-[80%]">
          <div className="ring-1 min-h-screen ring-gray-700 ">
            <Menu />

            <EditorContent editor={editor} />
          </div>
        </div>
      </EditorProvider>
    </>
  );
};

export default Editor;
