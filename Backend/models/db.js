const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool
  .connect()
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;

//=================================================
// ! Don't Active the function please

const createTables = () => {
  pool
    .query(
      ` CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        country VARCHAR(255),
        is_deleted SMALLINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

       CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
  `
    )
    .then((res) => {
      console.log("Tables created successfully");
    })
    .catch((err) => {
      console.log("Error creating tables:", err);
    });
};

// createTables();
