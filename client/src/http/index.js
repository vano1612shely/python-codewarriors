import axios from "axios"

export const API_URL = "http://localhost:5000"

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      const originalRequest = error.config
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem("token", response.data.accessToken)
        return api.request(originalRequest)
      } catch (e) {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token")
        }
        console.log("Користувач не авторизований")
        return false
      }
    }
    return error.response
  }
)
export default api
