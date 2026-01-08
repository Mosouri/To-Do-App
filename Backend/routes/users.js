const express = require("express");

const userRouter = express.Router();
const { register } = require("../controllers/users");
userRouter.post("/register", register);

module.exports = userRouter;
