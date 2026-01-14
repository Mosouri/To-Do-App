const express = require("express");
const { createList, updateList, deleteList } = require("../controllers/lists");

const listsRouter = express.Router();

listsRouter.post("/", createList);
listsRouter.put("/", updateList);
listsRouter.delete("/", deleteList);

module.exports = listsRouter;
