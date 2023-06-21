import api from "../http"
export default class TestsService {
  static async createTest(task_id, params, result) {
    const response = await api.post("/api/tests/create", {
      task_id,
      params: JSON.stringify(params),
      result: JSON.stringify(result),
    })
    return response
  }
  static async deleteTest(id) {
    const result = await api.post("/api/tests/delete", { id })
    return result
  }
  static async updateTest(id, params, result) {
    const response = await api.post("/api/tests/update", {
      id,
      params,
      result,
    })
    return response
  }
  static async getTest(id) {
    const result = await api.get("/api/tests/getTest", {
      params: { id },
    })
    return result
  }
  static async getTests(task_id) {
    const result = await api.get("/api/tests/getTests", {
      params: { task_id },
    })
    return result
  }
}
