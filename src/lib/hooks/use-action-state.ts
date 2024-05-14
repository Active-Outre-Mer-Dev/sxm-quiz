import { useFormState } from "react-dom";
import type { ActionReturn } from "@/types/actionts.type";

export function useActionState<State>(
  action: (
    state: ActionReturn<State>,
    formDate: FormData
  ) => ActionReturn<State> | Promise<ActionReturn<State>>
) {
  return useFormState(action, { inputErrors: null, message: "", status: null });
}
