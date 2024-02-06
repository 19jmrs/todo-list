"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createTodoAction } from "@/app/actions";

export function CreateTodoForm() {
  const [newInput, setInput] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const create = createTodoAction(newInput);
    create.then((result) => {
      return alert(result);
    });
  }
  return (
    <form className="text-white">
      <Input
        placeholder="Add a todo"
        className="text-black"
        onChange={handleChange}
      />
      <button
        className="bg-lime-500 px-4 rounded-full mt-2"
        onClick={handleClick}
      >
        Add
      </button>
    </form>
  );
}
