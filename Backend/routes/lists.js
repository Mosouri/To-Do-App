const express = require("express");
const { createList } = require("../controllers/lists");

const listsRouter = express.Router();

listsRouter.post("/", createList);

module.exports = listsRouter;
