const uuid = require("uuid")
const tasksService = require("./services/tasks.service")
class Rooms {
  rooms = []
  getRooms() {
    return this.rooms
  }
  getRoom(id) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        return this.rooms[i]
      }
    }
  }
  addRoom(name, password, level) {
    const id = uuid.v4()
    this.rooms.push({
      id,
      name,
      password,
      level,
      players: [],
      status: "waiting",
    })
    return id
  }
  deleteRoom(id) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id === id) {
        this.rooms.splice(i, 1)
        return true
      }
    }
    return false
  }
  async setTasks(id) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        this.rooms[i].tasks = await tasksService.getRandomTasks(
          this.rooms[i].level
        )
      }
    }
  }
  connectToRoom(id, userId) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id && this.rooms[i].players.length < 2) {
        let userAdded = false
        for (let j = 0; j < this.rooms[i].players.length; j++) {
          if (this.rooms[i].players[j].userId == userId) {
            userAdded = true
          }
        }
        if (!userAdded) {
          this.rooms[i].players.push({ userId })
        }
        return true
      } else {
        return false
      }
    }
  }
  changeStatus(roomId, status) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == roomId) {
        this.rooms[i].status = status
      }
    }
  }
  checkUser(id, userId) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        for (let j = 0; j < this.rooms[i].players.length; j++) {
          if (this.rooms[i].players[j].userId == userId) {
            return true
          }
        }
      }
    }
    return false
  }
  addSocket(id, socket, userId) {
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id == id) {
        let userAdded = false
        for (let j = 0; j < this.rooms[i].players.length; j++) {
          if (this.rooms[i].players[j].userId == userId) {
            this.rooms[i].players[j].socket = socket
          }
        }
      }
    }
  }
}
module.exports = new Rooms()
