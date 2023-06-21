import api from "../http"
export default class AuthService {
  static async registration(email, login, password) {
    const result = await api.post("/api/users/registration", {
      email,
      login,
      password,
    })
    return result
  }
  static async login(login, password) {
    const result = await api.post("/api/users/login", { login, password })
    if (result && result.data) {
      localStorage.setItem("token", result.data.accessToken)
    }
    return result
  }
  static async refresh() {
    const result = await api.get("/api/users/refresh")
    if (result && result.status === 200) {
      localStorage.setItem("token", result.data.accessToken)
    }
    return result
  }
  static async logout() {
    localStorage.removeItem("token")
    return api.get("/api/users/logout")
  }
}
