import express from "express";
import { createTodo, deleteAllTodos, delteOneTodo, getAllTodos, getOneTodo, guardUpdateTodo, updateTodo } from "./todo";
import { getAllUser, login, register } from "./user";
import { checkStatus } from "./status";

const server = express();
const userRouter = express.Router();
const todoRouter = express.Router();
const statusRouter = express.Router();

server.use(express.json());
server.use("/status", statusRouter);
server.use("/user", userRouter);
server.use("/todo", todoRouter);

const PORT = 8000;

statusRouter.get("/", checkStatus);

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/", getAllUser);

todoRouter.post("/", createTodo); // Create new TODO
todoRouter.get("/", getAllTodos); // Get all TODOs
todoRouter.get("/:id", getOneTodo); // Get 1 TODO

todoRouter.post("/update", guardUpdateTodo);

todoRouter.post("/update/:id", updateTodo); // Update 1 TODO
todoRouter.delete("/", deleteAllTodos); // Delete all TODOs
todoRouter.delete("/:id", delteOneTodo); // Delete 1 TODo

// Listen

server.listen(PORT, async () => {
  console.log(`server listening on port ${PORT}`);
});
