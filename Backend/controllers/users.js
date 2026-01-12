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

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  try {
    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }
    const payload = {
      userId: user.userId,
    };
    const option = {
      expiresIn: "60m",
    };

    const token = jwt.sign(payload, process.env.SECRET, option);
    res.status(201).json({
      success: true,
      message: "Login Successful",
      token: token,
      userId: user.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Valid login Credentials",
      err: err.message,
    });
  }
};

const getUserInfoById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users WHERE id='${id}' AND users.is_deleted=0`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `User ${id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

module.exports = { register, login, getUserInfoById };
