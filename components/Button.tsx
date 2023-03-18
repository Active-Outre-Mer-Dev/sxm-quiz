"use client";
import { cva } from "cva";
import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "cva";

const styles = cva("rounded-full relative active:top-[2px] px-4 py-2 label-large", {
  variants: {
    intent: {
      primary: "bg-primary text-on-primary",
      secondary: "ring-1 ring-outline text-primary",
      text: "text-primary bg-surface"
    }
  },
  defaultVariants: {
    intent: "primary"
  }
});

type PropTypes = ComponentPropsWithRef<"button"> & VariantProps<typeof styles>;

export const Button = forwardRef<HTMLButtonElement, PropTypes>(({ className, intent, ...props }, ref) => {
  return (
    <button ref={ref} {...props} className={styles({ className, intent })}>
      {props.children}
    </button>
  );
});
