import { Button } from "@aomdev/ui";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Save
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useCurrentEditor } from "@/lib/hooks/use-editor";
import { MenuItem } from "@/app/(admin)/admin/articles/[slug]/_client/menu-item";
import { editContent } from "@/app/(admin)/admin/articles/[slug]/actions";
import type { Editor } from "@tiptap/react";

type MenuItem = {
  isActive: (editor: Editor) => boolean;
  Icon: LucideIcon;
  onClick: (editor: Editor) => void;
  type: string;
};

const headingItems: MenuItem[] = [
  {
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
    Icon: Heading1,
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    type: "heading1"
  },
  {
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
    Icon: Heading2,
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    type: "heading2"
  },
  {
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
    Icon: Heading3,
    onClick: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    type: "heading3"
  }
];

const textItems: MenuItem[] = [
  {
    isActive: (editor) => editor.isActive("bold"),
    Icon: Bold,
    onClick: (editor) => editor.chain().focus().toggleBold().run(),
    type: "bold"
  },
  {
    isActive: (editor) => editor.isActive("italic"),
    Icon: Italic,
    onClick: (editor) => editor.chain().focus().toggleItalic().run(),
    type: "italic"
  },
  {
    isActive: (editor) => editor.isActive("bulletList"),
    Icon: List,
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    type: "bullet-list"
  },
  {
    isActive: (editor) => editor.isActive("orderedList"),
    Icon: ListOrdered,
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    type: "ordered-list"
  }
];

export function Menu() {
  const [, startTransition] = useTransition();
  const editor = useCurrentEditor();
  const params = useParams();

  const onEditContent = () => {
    startTransition(async () => {
      const data = await editContent(editor.getHTML(), params.slug as string);
      if (data.status === "error") toast.error(data.message);
      if (data.status === "success") toast.success(data.message);
    });
  };

  return (
    <div className=" border-b flex justify-between items-center bg-neutral-900 z-10 border-b-gray-700 h-16 px-4 sticky top-0 left-0">
      <div className="flex gap-4">
        <div className="flex gap-1">
          {headingItems.map((props) => (
            <MenuItem
              {...props}
              key={props.type}
            />
          ))}
        </div>
        <div className="flex gap-1">
          {textItems.map((props) => (
            <MenuItem
              {...props}
              key={props.type}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          size={"sm"}
          onClick={onEditContent}
        >
          {
            <Save
              size={16}
              className="inline-block mr-2"
            />
          }
          Save content
        </Button>
      </div>
    </div>
  );
}
