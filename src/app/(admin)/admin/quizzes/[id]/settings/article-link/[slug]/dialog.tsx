"use client";
import { Dialog, Skeleton } from "@aomdev/ui";
import { Edit } from "lucide-react";
import { Suspense, lazy, useState } from "react";
import { ScrollArea } from "@aomdev/ui";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

const Editor = lazy(() => import("./edit-article"));

type PropTypes = {
  defaultContent: string;
  slug: string;
  imgPath: string | null;
  published: boolean;
};

export function EditorDialog(props: PropTypes) {
  const [isLoaded, setIsLoaded] = useState(true);
  return (
    <Dialog>
      <Dialog.Trigger
        className={buttonStyles({ variant: "neutral", size: "sm" })}
        onMouseEnter={!isLoaded ? setIsLoaded.bind(null, true) : undefined}
      >
        <>
          {" "}
          <Edit
            size={16}
            className="inline-block mr-2"
          />{" "}
          Edit
        </>
      </Dialog.Trigger>
      <Dialog.Content className="w-2/4 bg-neutral-900">
        <Suspense fallback={<ArticleLoading />}>
          <ScrollArea
            style={{ height: "75vh", minHeight: "75vh" }}
            className="-m-4 "
          >
            {isLoaded && <Editor {...props} />}
          </ScrollArea>
        </Suspense>
      </Dialog.Content>
    </Dialog>
  );
}

function ArticleLoading() {
  return (
    <div
      style={{ height: "75vh" }}
      className="-m-4"
    >
      <div className=" border-b flex justify-between items-center bg-neutral-900 z-10 border-b-gray-700 h-16 px-4 sticky top-0 left-0">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <Skeleton
              className="h-6 w-6 rounded-full"
              animate
            />
            <Skeleton
              className="h-6 w-6 rounded-full"
              animate
            />
            <Skeleton
              className="h-6 w-6 rounded-full"
              animate
            />
          </div>
          <div className="flex gap-1">
            <Skeleton
              className="h-6 w-6 rounded-full"
              animate
            />
            <Skeleton
              className="h-6 w-6 rounded-full"
              animate
            />
          </div>
        </div>
        <Skeleton
          className="h-8 w-24 rounded"
          animate
        />
      </div>
    </div>
  );
}
