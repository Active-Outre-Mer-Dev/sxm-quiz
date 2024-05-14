import { z } from "zod";

export type ActionReturn<T> = {
  status: "error" | "success" | null;
  inputErrors: null | z.typeToFlattenedError<T>["fieldErrors"];
  message: string;
};
