"use client";
import * as RadixProgress from "@radix-ui/react-progress";

type PropTypes = {
  progress: number;
};

export function Progress({ progress }: PropTypes) {
  return (
    <>
      <RadixProgress.Root
        max={100}
        value={progress}
        className={`h-1 flex items-center  justify-center overflow-hidden  
        relative bg-surface-variant w-16 `}
      >
        <RadixProgress.Indicator
          className=" bg-primary w-full h-full duration-200 ease-out "
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </RadixProgress.Root>
    </>
  );
}
