import api from "../http"
export default class UsersService {
  static async getTop10() {
    const result = await api.get("/api/users/getTop10")
    return result
  }
  static async getUser(id) {
    const result = await api.get("/api/users/getUser", { params: { id } })
    return result
  }
}
