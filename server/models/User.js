const pool = require("../config/db.js");

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      email       VARCHAR(100) NOT NULL UNIQUE,
      password    VARCHAR(255) NOT NULL,
      role        VARCHAR(10)  NOT NULL DEFAULT 'user',
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

createUsersTable();

const createUser = async (name, email, password) => {
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return true;
};

const setAdmin = async (id) => {
  const result = await pool.query(
    `UPDATE users SET role = 'admin' WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
};

const removeAdmin = async (id) => {
  const result = await pool.query(
    `UPDATE users SET role = 'user' WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  deleteUser,
  setAdmin,
  removeAdmin,
};
