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

module.exports = { createList };
