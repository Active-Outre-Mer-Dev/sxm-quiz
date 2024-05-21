import { Editor } from "@tiptap/react";
import { useContext, createContext } from "react";

export const EditorContext = createContext<Editor | null>(null);

export function useCurrentEditor() {
  const editor = useContext(EditorContext);
  if (!editor) throw new Error("Wtf");
  return editor;
}
