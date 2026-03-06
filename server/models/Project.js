const pool = require('../config/db.js')

const createProjectsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(100) NOT NULL,
      description TEXT,
      owner_id    INTEGER NOT NULL REFERENCES users(id),
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
  await pool.query(query)
}

createProjectsTable()


const createProject = async (name, description, owner_id) => {
  const query = `INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *`
  const values = [name, description, owner_id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllProjects = async () => {
  const result = await pool.query(`SELECT * FROM projects`)
  return result.rows
}

const getProjectById = async (id) => {
  const result = await pool.query(`SELECT * FROM projects WHERE id = $1`, [id]);
  return result.rows[0];
}

const updateProject = async (id, name, description) => {
  const result = await pool.query(
    `UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
}

const deleteProject = async (id) => {
  const result = await pool.query(
    `DELETE FROM projects WHERE id = $1`, [id]
  );
  return true;
}

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject }