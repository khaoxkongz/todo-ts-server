import express from "express";
import { checkStatus } from "./status";

const server = express();
const statusRouter = express.Router();

server.use(express.json());
server.use("/status", statusRouter);

const PORT = 8000;

// async function fooHandler(req:Request, res: Response): Promise<Response> {
//   return Promise.reject("not implemented");
// }

statusRouter.get("/", checkStatus);
// Listen

server.listen(PORT, async () => {
  console.log(`server listening on port ${PORT}`);
});
