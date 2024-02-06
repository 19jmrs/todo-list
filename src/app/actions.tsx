"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db/index";
import { todos } from "../db/schema";
import { asc, eq } from "drizzle-orm";

export async function createTodoAction(todo: string) {
  if (!todo) {
    return "Error";
  }

  await db.insert(todos).values({ text: todo });

  revalidatePath("/");

  return "Success";
}

export async function getAllTodosAction() {
  return db.query.todos.findMany({
    orderBy: [asc(todos.id)],
  });
}

export async function changeTodoStateAction(id: number, state: boolean) {
  await db.update(todos).set({ completed: !state }).where(eq(todos.id, id));

  revalidatePath("/");
}

export async function deleteTodoAction(id: number) {
  await db.delete(todos).where(eq(todos.id, id)).returning({
    deletedTodo: todos.text,
  });
  revalidatePath("/");
}
