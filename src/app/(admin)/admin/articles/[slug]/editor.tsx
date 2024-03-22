"use client";
import { ActionIcon } from "@aomdev/ui";
import { useEditor, EditorContent, Editor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Copy, Heading1, Heading2, Heading3, Italic, RefreshCcw, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function createMarkdown(content: JSONContent) {
  let markdown = "";
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

type PropTypes = {
  defaultContent: string;
  slug: string;
};

type ContentSave = { timestamp: Date; content: string; html: string; id: string; isActive: boolean };

const Tiptap = ({ defaultContent, slug }: PropTypes) => {
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
          console.log(e.altKey, e.key);
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
      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
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
      <div>
        <div className="flex gap-6">
          <div className="basis-3/5 ring-1 h-fit ring-gray-700">
            <Menu
              editor={editor}
              onSave={handleSave}
            />

            <EditorContent editor={editor} />
          </div>
          <MarkdownSaves
            clearSave={clearSave}
            clearAll={clearAll}
            saves={saves}
            setSave={setSave}
          />
        </div>
      </div>
    </>
  );
};

export default Tiptap;

function Menu({ editor, onSave }: { editor: Editor; onSave: () => void }) {
  const onClick = async () => {
    const markdown = createMarkdown(editor.getJSON());
    await navigator.clipboard.writeText(markdown);
  };
  return (
    <div className=" border-b flex justify-between items-center bg-neutral-800 border-b-gray-700 h-16 px-4">
      <div className="flex gap-4">
        <div className="flex gap-1">
          <ActionIcon
            size={"md"}
            color="gray"
            data-active={editor.isActive("heading", { level: 1 })}
            className="data-[active=true]:ring-2 ring-white"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 size={16} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            color="gray"
            size={"md"}
            data-active={editor.isActive("heading", { level: 2 })}
            className="data-[active=true]:ring-2 ring-white"
          >
            <Heading2 size={16} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            color="gray"
            size={"md"}
            data-active={editor.isActive("heading", { level: 3 })}
            className="data-[active=true]:ring-2 ring-white"
          >
            <Heading3 size={16} />
          </ActionIcon>
        </div>
        <div className="flex gap-1">
          <ActionIcon
            onClick={() => editor.chain().focus().toggleItalic().run()}
            color="gray"
            size={"md"}
            data-active={editor.isActive("italic")}
            className="data-[active=true]:ring-2 ring-white"
          >
            <Italic size={16} />
          </ActionIcon>
          <ActionIcon
            onClick={() => editor.chain().focus().toggleBold().run()}
            color="gray"
            size={"md"}
            data-active={editor.isActive("bold")}
            className="data-[active=true]:ring-2 ring-white"
          >
            <Bold size={16} />
          </ActionIcon>
        </div>
      </div>
      <div className="flex gap-1">
        <ActionIcon
          onClick={onClick}
          className="mb-2"
        >
          <Copy size={"75%"} />
        </ActionIcon>
        <ActionIcon
          onClick={onSave}
          className="mb-2"
          color="success"
        >
          <Save size={"75%"} />
        </ActionIcon>
      </div>
    </div>
  );
}

function MarkdownSaves({
  saves,
  setSave,
  clearSave,
  clearAll
}: {
  saves: ContentSave[];
  setSave: (content: ContentSave) => void;
  clearSave: (id: string) => void;
  clearAll: () => void;
}) {
  return (
    <>
      <div
        style={{ width: "calc(83% - 50% - 8px )" }}
        className="fixed right-2 top-16"
      >
        <AnimatePresence>
          {saves.length > 0 && (
            <motion.div
              key={"clear"}
              className="ml-auto block w-fit mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ActionIcon
                onClick={clearAll}
                color="gray"
              >
                <RefreshCcw size={"75%"} />
              </ActionIcon>
            </motion.div>
          )}
        </AnimatePresence>

        <ul className=" z-10  ">
          <AnimatePresence mode="popLayout">
            {saves.toReversed().map((save) => {
              return (
                <motion.li
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ bounce: 0, type: "spring", duration: 0.5 }}
                  exit={{ opacity: 0 }}
                  key={save.id}
                  className="w-full relative mb-4 group "
                  layout
                >
                  <button
                    className="absolute right-2 top-2"
                    onClick={clearSave.bind(null, save.id)}
                  >
                    <X size={16} />
                  </button>
                  <button
                    data-active={save.isActive}
                    onClick={setSave.bind(null, save)}
                    className="bg-neutral-800  data-[active=true]:ring-2 ring-neutral-700 rounded px-2 pt-6 pb-4 text-start w-full"
                  >
                    <span className="line-clamp-2 ">{save.content}</span>
                    <span className="text-end block mt-2 text-gray-300 font-semibold text-sm">
                      {save.timestamp.toLocaleString()}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
}
