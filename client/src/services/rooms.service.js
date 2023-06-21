import api from "../http"
export default class RoomsService {
  static async createRoom(name, password, level) {
    const result = await api.post("/api/rooms/create", {
      name,
      password,
      level,
    })
    return result
  }
  static async joinToRoom(id, password) {
    const result = await api.post("/api/rooms/join", {
      id,
      password,
    })
    return result
  }
  static async getRoom(id) {
    const result = await api.get("/api/rooms/getRoom", {
      params: { id },
    })
    return result
  }
  static async getRooms() {
    const result = await api.get("/api/rooms/getRooms")
    return result
  }
}
