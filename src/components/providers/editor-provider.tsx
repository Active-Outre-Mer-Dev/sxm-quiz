import { EditorContext } from "@/lib/hooks/use-editor";
import { Editor } from "@tiptap/react";

export function EditorProvider(props: { editor: Editor; children: React.ReactNode }) {
  return <EditorContext.Provider value={props.editor}>{props.children}</EditorContext.Provider>;
}
