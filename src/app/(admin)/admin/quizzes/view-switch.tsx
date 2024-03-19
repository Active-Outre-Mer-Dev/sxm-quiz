"use client";
import { Switch } from "@aomdev/ui";
import { setView } from "./actions";
import { useTransition } from "react";

export function ViewSwitch({ defaultChecked }: { defaultChecked: boolean }) {
  const [, startTransition] = useTransition();
  return (
    <>
      <Switch
        defaultChecked={defaultChecked}
        onCheckedChange={(e) => {
          startTransition(() => {
            setView();
          });
        }}
        label="Board view"
        name="board-view"
      />
    </>
  );
}
