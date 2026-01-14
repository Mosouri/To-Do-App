const { data } = require("react-router-dom");
const db = require("../models/db");

const createList = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  db.query(`INSERT INTO lists (name) VALUES ($1) RETURNING *`, [name])
    .then((result) => {
      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateList = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  const values = [name, id];

  db.query(
    `UPDATE lists SET name = $1, updated_at = CURRENT_TIME WHERE id = $2 RETURNING *`,
    values
  )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "List not found",
        });
      }
      res.json({
        success: true,
        data: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const deleteList = (req, res) => {
  const { id } = req.params;

  const values = [id];

  db.query(`DELETE FROM lists WHERE id = $1 RETURNING *`)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "List not found",
        });
      }
      res.json({
        success: true,
        message: "List deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

module.exports = { createList, updateList, deleteList };
