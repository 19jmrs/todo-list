import { Input } from "@/components/ui/input";
import {
  changeTodoStateAction,
  createTodoAction,
  deleteTodoAction,
} from "@/app/actions";
import { TodoTable } from "@/app/todos-table";
import { CreateTodoForm } from "./create-todo-form";
import { getAllTodosAction } from "./actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CheckSquareIcon, SquareIcon, X } from "lucide-react";

export default async function Home() {
  const todos = await getAllTodosAction();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black">
      <h1 className="text-white font-extrabold mb-2">TODO table</h1>
      <Table className="w-full justify-center items-center">
        <TableCaption>A list of todo's</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">State</TableHead>
            <TableHead className="">Todo</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>
        {todos.map((todo) => (
          <TableBody key={todo.id} className="text-white">
            <TableCell className="text-white">
              <form
                action={changeTodoStateAction.bind(
                  null,
                  todo.id,
                  todo.completed!
                )}
              >
                <button>
                  {todo.completed ? <CheckSquareIcon /> : <SquareIcon />}
                </button>
              </form>
            </TableCell>
            <TableCell>{todo.text}</TableCell>
            <TableCell>
              <form action={deleteTodoAction.bind(null, todo.id)}>
                <button>
                  <X className="text-red-600" />
                </button>
              </form>
            </TableCell>
          </TableBody>
        ))}
      </Table>
      <CreateTodoForm />
    </main>
  );
}
