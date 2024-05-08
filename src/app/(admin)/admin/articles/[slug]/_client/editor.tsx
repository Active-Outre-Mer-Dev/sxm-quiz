"use client";
import { ArticleData, createMarkdown } from "@/lib/create-markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Menu } from "./menu";
import { MarkdownSaves } from "./markdown-saves";

type PropTypes = {
  defaultContent: string;
  slug: string;
  branch: string | null;
  articleData: ArticleData;
  imgPath: string | null;
};
export type ContentSave = { timestamp: Date; content: string; html: string; id: string; isActive: boolean };

const Tiptap = ({ defaultContent, slug, articleData, branch, imgPath }: PropTypes) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultContent,
    editorProps: {
      attributes: {
        class: `p-4 outline-none prose-headings:font-bold prose-headings:font-heading h-fit prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl`
      }
    }
  });
  const [saves, setSaves] = useState<ContentSave[]>([]);

  useEffect(() => {
    if (editor) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "s") {
          e.preventDefault();
          // Update state logic here
          setSaves((prev) => {
            const newSaves = [
              ...prev.map((content) => ({ ...content, isActive: false })),
              {
                content: editor.getText(),
                timestamp: new Date(),
                html: editor.getHTML(),
                id: crypto.randomUUID(),
                isActive: true
              }
            ];
            sessionStorage.setItem(slug, JSON.stringify(newSaves));

            return newSaves;
          });
        }
      };
      const handleCopyShortcut = async (e: KeyboardEvent) => {
        if (e.altKey && e.key === "c") {
          e.preventDefault();
          console.log("test");
          await navigator.clipboard.writeText(createMarkdown(editor.getJSON(), articleData));
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keydown", handleCopyShortcut);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keydown", handleCopyShortcut);
      };
    }
  }, [editor?.isEditable]);

  useEffect(() => {
    const saves = sessionStorage.getItem(slug);
    if (!saves) return;
    const parsedSaves = JSON.parse(saves) as ContentSave[];
    setSaves(parsedSaves);
    const activeSave = parsedSaves.find((save) => save.isActive);
    if (activeSave) {
      editor?.commands.setContent(activeSave.html);
    }
  }, [editor?.isEditable]);

  if (!editor) return null;

  const handleSave = () => {
    const newSaves = [
      ...saves.map((content) => ({ ...content, isActive: false })),
      {
        content: editor.getText(),
        timestamp: new Date(),
        html: editor.getHTML(),
        id: crypto.randomUUID(),
        isActive: true
      }
    ];
    setSaves(newSaves);
    sessionStorage.setItem(slug, JSON.stringify(newSaves));
  };

  const setSave = (save: ContentSave) => {
    const content = saves.find((s) => save.id === s.id);
    if (content) {
      setSaves((prev) => prev.map((save) => ({ ...save, isActive: content.id === save.id })));
      editor.commands.setContent(content.html);
    }
  };

  const clearAll = () => {
    setSaves([]);
  };

  const clearSave = (id: string) => {
    const newSaves = saves.filter((save) => save.id !== id);
    setSaves(newSaves);
    sessionStorage.setItem(slug, JSON.stringify(newSaves));
  };

  return (
    <>
      <div className="basis-[80%]">
        <div className="ring-1 min-h-screen ring-gray-700">
          <Menu
            editor={editor}
            onSave={handleSave}
            articleData={articleData}
            branch={branch}
            imgPath={imgPath}
          />

          <EditorContent editor={editor} />
        </div>
        {/* <MarkdownSaves
            clearSave={clearSave}
            clearAll={clearAll}
            saves={saves}
            setSave={setSave}
          /> */}
      </div>
    </>
  );
};

export default Tiptap;
