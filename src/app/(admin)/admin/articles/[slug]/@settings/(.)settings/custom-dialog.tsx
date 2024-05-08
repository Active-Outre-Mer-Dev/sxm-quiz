"use client";
import { Dialog, ScrollArea } from "@aomdev/ui";
import { useRouter } from "next/navigation";
import type { DialogProps } from "@aomdev/ui";

export function CustomDialog({ children, ...props }: DialogProps) {
  const router = useRouter();
  return (
    <>
      <Dialog
        {...props}
        open
      >
        <Dialog.Content
          portalProps={{ onClick: () => router.back() }}
          className="w-1/4"
        >
          <ScrollArea
            style={{ height: "75vh" }}
            className="p-4 -m-4"
          >
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title>Edit article</Dialog.Title>
              <Dialog.Close onClick={router.back}>X</Dialog.Close>
            </div>
            {children}
          </ScrollArea>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
