"use server";
import { createClient } from "@/lib/supabase";
import { Quiz } from "@/types/custom.types";
import { revalidatePath } from "next/cache";
import { cookies as nextCookies } from "next/headers";
export const updateQuiz = async (id: number, status: Quiz["status"]) => {
  await createClient("server_action").from("quiz").update({ status }).eq("id", id);
  revalidatePath("/admin/quizzes");
};

export const setView = async () => {
  const cookies = nextCookies();
  const boardView = cookies.get("board-view");
  if (boardView?.value === "table") {
    cookies.set("board-view", "kanban");
  } else if (boardView?.value === "kanban") {
    cookies.set("board-view", "table");
  } else {
    cookies.set("board-view", "kanban");
  }
};
