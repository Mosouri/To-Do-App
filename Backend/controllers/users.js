const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  console.log(req.body);

  const { username, first_name, last_name, email, password, country } =
    req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const normalizedEmail = email.toLowerCase();
  const encryptedPassword = await bcrypt.hash(password, 5);

  const query = `INSERT INTO users (first_name, last_name, username, country, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [
    first_name,
    last_name,
    username,
    country,
    normalizedEmail,
    encryptedPassword,
  ];

  db.query(query, values)
    .then((result) => {
      console.log("result : ", result.rows[0].id);
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        user: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "The Email Already Exists",
        err: err,
      });
    });
};


module.exports = { register };
