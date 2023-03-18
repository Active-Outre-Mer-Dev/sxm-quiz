"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useContext, createContext } from "react";

type ContextProps = {
  title: string;
};

const DialogContext = createContext<ContextProps | null>(null);

function useDialog() {
  const props = useContext(DialogContext);
  if (!props) throw new Error("Content must be rendered as Dialog child");
  return props;
}

type PropTypes = ContextProps & RadixDialog.DialogProps;

export function Dialog(props: PropTypes) {
  return (
    <DialogContext.Provider value={{ title: props.title }}>
      <RadixDialog.Root>{props.children}</RadixDialog.Root>
    </DialogContext.Provider>
  );
}

function Trigger(props: RadixDialog.DialogTriggerProps) {
  return <RadixDialog.Trigger {...props}>{props.children}</RadixDialog.Trigger>;
}

function Content(props: RadixDialog.DialogContentProps) {
  const { title } = useDialog();
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="bg-scrim/30 z-50 fixed top-0 left-0 w-full h-full" />
      <RadixDialog.Content className="body-medium bg-surface min-w-[300px] fixed z-[100] top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] rounded-xl p-7">
        <div className="flex justify-between mb-4">
          <RadixDialog.Title className="headline-small text-on-surface">{title}</RadixDialog.Title>
          <RadixDialog.Close>
            <Cross2Icon />
          </RadixDialog.Close>
        </div>
        {props.children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

function Close(props: RadixDialog.DialogCloseProps) {
  return <RadixDialog.Close {...props}>{props.children}</RadixDialog.Close>;
}

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Close = Close;
