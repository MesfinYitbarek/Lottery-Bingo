import express from "express"
import { signup, test } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/signup", signup);
export default userRouter