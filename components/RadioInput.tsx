"use client";
import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";

type PropTypes = Omit<ComponentPropsWithRef<"input">, "type"> & { label: string };

export const RadioInput = forwardRef<HTMLInputElement, PropTypes>((props, ref) => {
  return (
    <div className="flex items-center">
      <input ref={ref} {...props} type={"radio"} className="accent-primary h-5 w-5 inline-block mr-2" />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
});

RadioInput.displayName = "RadioInput";
