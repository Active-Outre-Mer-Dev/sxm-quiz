import { z } from "zod";

export type ActionReturn<T> = {
  status: "error" | "success" | null;
  inputErrors: null | z.typeToFlattenedError<T>["fieldErrors"];
  message: string;
  submitId: string;
};

function createActionReturn<T>(
  status: ActionReturn<T>["status"],
  options: Omit<ActionReturn<T>, "status" | "submitId">
): ActionReturn<T> {
  return {
    ...options,
    status,
    submitId: crypto.randomUUID()
  };
}

export function errorActionReturn(options: Parameters<typeof createActionReturn>[1]) {
  return createActionReturn("error", options);
}

export function successActionReturn(message: string) {
  return createActionReturn("success", { message, inputErrors: null });
}
