import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import type { ActionReturn } from "../action-return";

type Options = {
  resetOnSuccess?: boolean;
  onSuccess?: (message: string) => void;
};

type ActionFunction<State> = (
  state: ActionReturn<State>,
  formDate: FormData
) => ActionReturn<State> | Promise<ActionReturn<State>>;

export function useActionState<State>(action: ActionFunction<State>, options?: Partial<Options>) {
  const [state, formAction] = useFormState(action, {
    inputErrors: null,
    message: "",
    status: null,
    submitId: ""
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status === "success" && formRef.current && options?.resetOnSuccess) {
      formRef.current.reset();
    }
  }, [formRef.current, options?.resetOnSuccess, state.status, state.submitId]);

  useEffect(() => {
    if (options?.onSuccess && state.status === "success") {
      options.onSuccess(state.message);
    }
  }, [state.submitId, state.message]);

  return {
    state,
    formAction,
    ref: formRef
  };
}
