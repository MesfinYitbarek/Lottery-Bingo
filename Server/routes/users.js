import express from "express"
import { deleteAdmin, signup, test, updateAdmin, userEdit, users } from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.get("/users", users);
userRouter.delete('/delete/:id', deleteAdmin)
userRouter.post("/signup", signup);
userRouter.post('/update/:id', updateAdmin)
userRouter.get("/userEdit/:id", userEdit);

export default userRouter