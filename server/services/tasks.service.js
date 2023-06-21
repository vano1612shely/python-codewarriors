const bcrypt = require("bcryptjs")
const db = require("../db")
const ApiError = require("../exceptions/api-error")
class TasksService {
  async createTask(name, text, difficulty_level, points) {
    const query = `
      INSERT INTO tasks (name, text, difficulty_level, points)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    const taskValues = [name, text, difficulty_level, points]

    const { rows: taskRows } = await db.query(query, taskValues)
    return taskRows[0]
  }
  async updateTask(id, name, text, difficulty_level, points) {
    const query = `
      UPDATE tasks SET name = $1, text = $2, difficulty_level= $3, points = $4
      WHERE id = $5
      RETURNING *;
    `
    const taskValues = [name, text, difficulty_level, points, id]

    const { rows: taskRows } = await db.query(query, taskValues)
    return taskRows[0]
  }
  async getTask(id) {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id])
    return result.rows[0]
  }
  async getTasks() {
    const result = await db.query("SELECT * FROM tasks")
    return result.rows
  }
  async deleteTask(id) {
    const result = await db.query("DELETE FROM tasks WHERE id = $1", [id])
    return result.rows
  }
  async getRandomTasks(difficulty_level) {
    const result = await db.query(
      "SELECT * FROM tasks WHERE difficulty_level = $1 ORDER BY random() LIMIT 3;",
      [difficulty_level]
    )
    return result.rows
  }
}
module.exports = new TasksService()
