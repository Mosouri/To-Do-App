const express = require("express");

const userRouter = express.Router();
const { register, login, getUserInfoById } = require("../controllers/users");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id", getUserInfoById);

module.exports = userRouter;
