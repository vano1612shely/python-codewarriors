const bcrypt = require("bcryptjs")
const db = require("../db")
const ApiError = require("../exceptions/api-error")
class TestsService {
  async createTest(task_id, params, result) {
    const query = `
      INSERT INTO tests (task_id, params, result)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const testValues = [task_id, JSON.stringify(params), JSON.stringify(result)]

    const { rows: testsRows } = await db.query(query, testValues)
    return testsRows[0]
  }
  async deleteTest(id) {
    const result = await db.query("DELETE FROM tests WHERE id = $1", [id])
    return result.rows[0]
  }
  async getTest(id) {
    const result = await db.query("SELECT * FROM tests WHERE id = $1", [id])
    return result.rows[0]
  }
  async getTests(task_id) {
    const result = await db.query("SELECT * FROM tests WHERE task_id= $1", [
      task_id,
    ])
    return result.rows
  }
}
module.exports = new TestsService()
