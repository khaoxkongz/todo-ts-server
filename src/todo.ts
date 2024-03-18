import { Request, Response } from "express";

// counter works like IDs
export let counter = 0;
export const todos = new Map();

export async function createTodo(req: Request, res: Response): Promise<Response> {
  const { msg } = req.body;
  if (!msg) {
    return res.status(400).json({ error: "missing msg in json body " });
  }

  const todo = { id: counter, msg };
  todos.set(todo.id, todo);

  // Increament counter
  counter++;

  return res.status(201).json(todo).end();
}

export async function getAllTodos(req: Request, res: Response): Promise<Response> {
  // Map.values() returns an iterator that
  // could be given to Array.from
  return res.status(200).json({ data: Array.from(todos.values()) });
}

export async function getOneTodo(req: Request<{ id: string }>, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  // isNaN checks if its arg is NaN
  if (isNaN(id)) {
    return res.status(400).json({ error: "id is not a number " });
  }

  const todo = todos.get(id);

  if (!todo) {
    return res.status(404).json({ error: `no such todo: ${id}` });
  }

  return res.status(200).json(todo).end();
}

export async function guardUpdateTodo(_req: Request, res: Response): Promise<Response> {
  return res.status(400).json({ error: "missing params id " }).end();
}

export async function updateTodo(
  req: Request<
    { id: string }, // req.params
    { error: string } | { id: string; msg: string }, // res.json
    { msg: string } // req.body
  >,
  res: Response
): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id is not a number" });
  }

  const { msg } = req.body;

  if (!msg) {
    return res.status(400).json({ error: "missing msg in json body" }).end();
  }

  const todo = todos.get(id);
  if (!todo) {
    return res.status(404).json({ error: `no such todo: ${id}` });
  }

  // todo is an object - it is passed by reference.
  // Mutating it here will also mutates the value in map 'todos'.
  todo.msg = msg;

  return res.status(201).json(todo).end();
}

export async function deleteAllTodos(_, res: Response): Promise<Response> {
  // Clear all entires in map 'todos'.
  todos.clear();

  return res.status(200).end();
}

export async function delteOneTodo(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id is not a number" });
  }

  // Map delete returns a boolean indicating a succesful deletion.
  // Deletion will fail if there's no such key in the map.
  if (!todos.delete(id)) {
    return res.status(404).json({ error: `no such todo: ${id}` });
  }

  return res.status(200).json({ status: `todo ${id} deleted succesfully` });
}
