import { FloatingMenu as _FloatingMenu, BubbleMenu as _BubbleMenu, Editor } from "@tiptap/react";
import { Button, TextInput } from "@aomdev/ui";
import { FormEvent, useState } from "react";
import { Bold, Heading1, Heading2, Heading3, Italic, Link, List, Trash2 } from "lucide-react";
import { Popover } from "@aomdev/ui";
import type { LucideIcon } from "lucide-react";

type Options = {
  title: string;
  description: string;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => void;
  Icon: LucideIcon;
};

const options: Options[] = [
  {
    title: "Heading 1",
    description: "Big section heading",
    action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
    Icon: Heading1
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
    Icon: Heading2
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
    Icon: Heading3
  },
  {
    title: "Bold",
    description: "Create bold text",
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
    Icon: Bold
  },
  {
    title: "Italic",
    description: "Create italic text",
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
    Icon: Italic
  },
  {
    title: "Bullet list",
    description: "Simple bullet list",
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
    Icon: List
  }
];

export function BubbleMenu({ editor }: { editor: Editor }) {
  const [selectedText, setSelectedText] = useState<{ from: number; to: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const onOpen = (open: boolean) => {
    setIsOpen(open);
    setSelectedText({ from: editor.state.selection.from, to: editor.state.selection.to });
    const attr = editor.getAttributes("link");
    if ("href" in attr) {
      setIsLink(true);
    } else {
      setIsLink(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const href = new FormData(e.currentTarget).get("url")?.toString();
    e.preventDefault();
    if (href && URL.canParse(href) && selectedText !== null) {
      editor.commands.setTextSelection(selectedText);
      editor.chain().extendMarkRange("link").setLink({ href }).run();
      setIsOpen(false);
      editor.commands.focus(selectedText.to);
    }
  };

  const removeLink = () => {
    editor.chain().extendMarkRange("link").unsetLink().run();
    if (selectedText) {
      editor.commands.focus(selectedText.to);
      setSelectedText(null);
    }
  };

  return (
    <>
      <_BubbleMenu
        editor={editor}
        className=" relative bg-neutral-900 p-1 border border-neutral-800 rounded flex items-center gap-4"
        tippyOptions={{}}
      >
        <ul className="space-y-4">
          {options.map((option) => {
            return (
              <li
                key={option.title}
                data-active={option.isActive(editor)}
                className="hover:bg-neutral-800/50 rounded data-[active=true]:bg-primary-500 focus-within:bg-neutral-800/50"
              >
                <button
                  onClick={option.action.bind(null, editor)}
                  className="flex gap-2 px-4 py-2 w-full h-full items-center outline-none"
                >
                  <span className="h-10 w-10 flex items-center justify-center border border-neutral-800 rounded bg-neutral-900">
                    <option.Icon size={16} />
                  </span>
                  <div className="flex flex-col gap-1  text-start">
                    <span className="font-medium">{option.title}</span>
                    <span className="text-gray-300 text-sm">{option.description}</span>
                  </div>
                </button>
              </li>
            );
          })}
          <li
            data-active={editor.isActive("link")}
            className="hover:bg-neutral-800/50 rounded data-[active=true]:bg-primary-500 focus-within:bg-neutral-800/50"
          >
            <Popover
              onOpenChange={onOpen}
              open={isOpen}
            >
              <Popover.Trigger asChild>
                <button className="flex gap-2 px-4 py-2 w-full h-full items-center outline-none">
                  <span className="h-10 w-10 flex items-center justify-center border border-neutral-800 rounded bg-neutral-900">
                    <Link size={16} />
                  </span>
                  <div className="flex flex-col gap-1  text-start">
                    <span className="font-medium">Link</span>
                    <span className="text-gray-300 text-sm">Insert link</span>
                  </div>
                </button>
              </Popover.Trigger>
              <Popover.Content
                side="right"
                sideOffset={10}
                className="p-4 z-[9999] bg-neutral-900 border-neutral-800 border rounded"
              >
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="flex items-end gap-2">
                    <TextInput
                      label="URL"
                      placeholder="Insert link"
                      size={"sm"}
                      name="url"
                    />{" "}
                    <Button size={"sm"}>Submit</Button>
                  </div>
                  {isLink && (
                    <button
                      onClick={removeLink}
                      type="button"
                      className="flex items-center hover:text-error-400 rounded outline-none p-1 focus-within:text-error-400 ring-error-400 focus-within:ring-1"
                    >
                      {" "}
                      <Trash2
                        size={16}
                        className="inline-block mr-1"
                      />
                      Remove link
                    </button>
                  )}
                </form>
              </Popover.Content>
            </Popover>
          </li>
        </ul>
      </_BubbleMenu>
    </>
  );
}
