import { useCurrentEditor } from "@/lib/hooks/use-editor";
import { ActionIcon } from "@aomdev/ui";
import type { Editor } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";

type Props = {
  isActive: (editor: Editor) => boolean;
  onClick: (editor: Editor) => void;
  Icon: LucideIcon;
};

export function MenuItem({ isActive, onClick, Icon }: Props) {
  const editor = useCurrentEditor();
  return (
    <ActionIcon
      size={"md"}
      color="gray"
      data-active={isActive(editor)}
      className="data-[active=true]:ring-2 ring-white"
      onClick={onClick.bind(null, editor)}
    >
      <Icon size={16} />
    </ActionIcon>
  );
}
