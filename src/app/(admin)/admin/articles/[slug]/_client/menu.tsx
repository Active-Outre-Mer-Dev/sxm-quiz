import { createMarkdown } from "@/lib/create-markdown";
import { ActionIcon, Dropdown } from "@aomdev/ui";
import {
  Bold,
  CircleEllipsis,
  Copy,
  Edit,
  GitPullRequest,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Trash
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteArticle, editContent } from "../actions";
import { toast } from "sonner";
import { useCurrentEditor } from "@/lib/hooks/use-editor";
import type { Editor } from "@tiptap/react";
import { MenuItem } from "./menu-item";

type PropTypes = {
  imgPath: string | null;
};

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

export function Menu({ imgPath }: PropTypes) {
  const [isPending, startTransition] = useTransition();
  const editor = useCurrentEditor();
  const params = useParams();
  const router = useRouter();

  const onClick = async () => {
    const markdown = createMarkdown(editor.getJSON());
    await navigator.clipboard.writeText(markdown);
  };

  const onEdit = () => {
    router.push(`/admin/articles/${params.slug}/settings`);
  };

  const onDelete = () => {
    startTransition(async () => {
      const { status, message } = await deleteArticle(params.slug as string, imgPath!);
      if (status === "error") {
        toast.error(message);
      }
      if (status === "success") {
        toast.success(message);
        router.push("/admin/articles");
      }
    });
  };

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
      <Dropdown>
        <Dropdown.Trigger>
          <ActionIcon color="gray">
            <CircleEllipsis size={"75%"} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Content style={{ zIndex: 50 }}>
          <Dropdown.Item
            onSelect={onClick}
            icon={<Copy size={14} />}
            rightSection={<>SHIFT S</>}
          >
            Copy content
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={onEditContent}
            icon={<GitPullRequest size={14} />}
          >
            Save to db
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            onSelect={onEdit}
            icon={<Edit size={14} />}
          >
            Edit article
          </Dropdown.Item>
          <Dropdown.Item
            disabled={isPending}
            icon={<Trash size={14} />}
            color="error"
            onSelect={onDelete}
          >
            Delete article
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
