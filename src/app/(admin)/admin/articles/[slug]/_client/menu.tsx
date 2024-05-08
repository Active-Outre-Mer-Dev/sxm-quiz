import { createMarkdown, type ArticleData } from "@/lib/create-markdown";
import { ActionIcon, Dropdown } from "@aomdev/ui";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  CircleEllipsis,
  Copy,
  GitPullRequest,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Save
} from "lucide-react";
import { useState } from "react";
import { PullRequestDialog } from "./pull-request-dialog";

type PropTypes = {
  articleData: ArticleData;
  editor: Editor;
  branch: string | null;
  onSave: () => void;
};

export function Menu({ editor, onSave, articleData, branch }: PropTypes) {
  const [isOpened, setisOpened] = useState(false);
  const onClick = async () => {
    const markdown = createMarkdown(editor.getJSON(), articleData);
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
      <PullRequestDialog
        open={isOpened}
        onOpenChange={setisOpened}
        content={createMarkdown(editor.getJSON(), articleData)}
        branch={branch}
      />
      <Dropdown>
        <Dropdown.Trigger>
          <ActionIcon color="gray">
            <CircleEllipsis size={"75%"} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            onSelect={onClick}
            icon={<Copy size={14} />}
            rightSection={<>SHIFT S</>}
          >
            Copy content
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={onSave}
            icon={<Save size={14} />}
            rightSection={<>CTRL S</>}
          >
            Save locally
          </Dropdown.Item>
          <Dropdown.Item
            onSelect={setisOpened.bind(null, true)}
            icon={<GitPullRequest size={14} />}
          >
            Create Pull Request
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
