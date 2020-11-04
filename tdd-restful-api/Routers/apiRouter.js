import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../Controllers/apiController";

const apiRouter = express.Router();

apiRouter.get("/users/:id", getUsers);
apiRouter.post("/users", addUser);
apiRouter.put("/users/:id", updateUser);
apiRouter.delete("/users/:id", deleteUser);

export default apiRouter;
