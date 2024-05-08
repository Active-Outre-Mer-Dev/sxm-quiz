import { ActionIcon } from "@aomdev/ui";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { RefreshCcw, X } from "lucide-react";
import { ContentSave } from "./editor";

export function MarkdownSaves({
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

        <ul className="z-10">
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
