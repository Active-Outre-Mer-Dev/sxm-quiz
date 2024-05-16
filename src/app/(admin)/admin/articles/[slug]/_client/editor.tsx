"use client";
import { ArticleData, createMarkdown } from "@/lib/create-markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Menu } from "./menu";

type PropTypes = {
  defaultContent: string;
  slug: string;
  articleData: ArticleData;
  imgPath: string | null;
};
export type ContentSave = { timestamp: Date; content: string; html: string; id: string; isActive: boolean };

const Tiptap = ({ defaultContent, slug, imgPath }: PropTypes) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: `p-4 outline-none prose-headings:font-bold prose-headings:font-heading h-fit prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl`
      }
    }
  });

  useEffect(() => {
    if (editor) {
      const handleCopyShortcut = async (e: KeyboardEvent) => {
        if (e.altKey && e.key === "c") {
          e.preventDefault();
          console.log("test");
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
      <div className="basis-[80%]">
        <div className="ring-1 min-h-screen ring-gray-700">
          <Menu
            editor={editor}
            imgPath={imgPath}
          />

          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};

export default Tiptap;
