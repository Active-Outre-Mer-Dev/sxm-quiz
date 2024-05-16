import { createMarkdown } from "@/lib/create-markdown";
import { ActionIcon, Dropdown } from "@aomdev/ui";
import type { Editor } from "@tiptap/react";
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
  Trash
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteArticle, editContent } from "../actions";
import { toast } from "sonner";

type PropTypes = {
  editor: Editor;
  imgPath: string | null;
};

export function Menu({ editor, imgPath }: PropTypes) {
  const [isPending, startTransition] = useTransition();
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
