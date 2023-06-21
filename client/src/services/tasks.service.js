import api from "../http"
export default class TasksService {
  static async createTask(name, text, difficulty_level, points) {
    const result = await api.post("/api/tasks/create", {
      name,
      text,
      difficulty_level,
      points,
    })
    return result
  }
  static async deleteTask(id) {
    const result = await api.post("/api/tasks/delete", { id })
    return result
  }
  static async updateTask(id, name, text, difficulty_level, points) {
    const result = await api.post("/api/tasks/update", {
      id,
      name,
      text,
      difficulty_level,
      points,
    })
    return result
  }
  static async getTask(id) {
    const result = await api.get("/api/tasks/getTask", {
      params: { id },
    })
    return result
  }
  static async getTasks() {
    const result = await api.get("/api/tasks/getTasks")
    return result
  }
}
