const bcrypt = require("bcryptjs")
const db = require("../db")
const ApiError = require("../exceptions/api-error")
const Rooms = require("../rooms")
const RoomDto = require("../dtos/room.dto")
const testsService = require("./tests.service")
const codeService = require("./code.service")
const userService = require("./user.service")
const io = require("../sockets.js").getIO()
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ id, userId }) => {
    let userAdded = Rooms.checkUser(id, userId)
    if (!userAdded) {
      socket.emit("connectionRefused")
    } else {
      socket.join(id)
      Rooms.addSocket(id, socket.id, userId)
      let room = Rooms.getRoom(id)
      io.to(id).emit("joinedToRoom", room)
      if (room.players.length == 2 && room.status == "waiting") {
        new RoomService().startGame(io, room)
      }
    }
  })
  socket.on("getTask", (id) => {
    let room = Rooms.getRoom(id)
    socket.emit("sendTask", room.current_task)
  })
  socket.on("disconnect", () => {
    const rooms = Object.keys(socket.rooms)
    rooms.forEach((roomName) => {
      io.to(roomName).emit("userDisconnected", socket.id)
    })
  })
  socket.on("sendCode", ({ code, id, userId }) => {
    let room = Rooms.getRoom(id)
    let task = room.current_task
    const getTests = async () => {
      let tests = await testsService.getTests(task.id)
      let correct_tests = 0
      for (let i = 0; i < tests.length; i++) {
        let result = await codeService.compileCode(code, tests[i])
        if (result == JSON.parse(tests[i].result)) {
          correct_tests++
        }
        socket.emit("sendTest", {
          correct_result: JSON.parse(tests[i].result),
          your_result: result,
        })
      }
      let players_ended = 0
      for (let j = 0; j < room.players.length; j++) {
        if (room.players[j].userId == userId) {
          if (!("tasks" in room.players[j])) {
            room.players[j]["tasks"] = {}
          }
          if (correct_tests == tests.length) {
            room.players[j]["tasks"][task.id] = true
            if (!("points" in room.players[j])) {
              room.players[j].points = 0
            }
            room.players[j].points += task.points
            players_ended++
            socket.emit("taskComplited")
            if (!task.winner) {
              task.winner = room.players[j].userId
              room.players[j].points += 5
            }
          } else {
            room.players[j]["tasks"][task.id] = false
          }
        } else {
          if (
            "tasks" in room.players[j] &&
            task.id in room.players[j]["tasks"] &&
            room.players[j]["tasks"][task.id] == true
          ) {
            players_ended++
          }
        }
      }
      if (players_ended == 2) {
        new RoomService().nextStage(io, room)
      }
    }
    getTests()
  })
  return () => {
    socket.off("sendCode")
    socket.off("getTask")
    socket.off("joinRoom")
    socket.off("disconnect")
  }
})
class RoomService {
  createRoom(name, password, level, userId) {
    const id = Rooms.addRoom(name, password, level)
    Rooms.connectToRoom(id, userId)
    io.emit("updateRoomsList", { rooms: Rooms.getRooms() })
    return id
  }
  async startGame(io, room) {
    Rooms.changeStatus(room.id, "start")
    await Rooms.setTasks(room.id)
    room.current_task_id = 0
    room.current_task = room.tasks[room.current_task_id]
    room.current_task.winner = null
    io.to(room.id).emit("startGame", new RoomDto(room))
    io.to(room.id).emit("sendTask", room.current_task)
  }
  async nextStage(io, room) {
    if (room.current_task_id < 2) {
      room.current_task_id++
      room.current_task = room.tasks[room.current_task_id]
      room.current_task.winner = null
      io.to(room.id).emit("sendTask", room.current_task)
    } else {
      this.finish(io, room)
    }
  }
  async finish(io, room) {
    let maxPoints = 0
    let maxPointsPlayerId = 0
    for (let i = 0; i < room.players.length; i++) {
      let win = false
      if (room.players[i].userId == room.winner) {
        win = true
      }
      await userService.addPoints(
        room.players[i].userId,
        room.players[i].points,
        win
      )
      if (room.players[i].points > maxPoints) {
        maxPoints = room.players[i].points
        maxPointsPlayerId = room.players[i].userId
      }
    }
    const player = await userService.getUser(maxPointsPlayerId)
    io.to(room.id).emit("finish", { winner: player.login, points: maxPoints })
    this.deleteRoom(room.id)
  }
  deleteRoom(id) {
    Rooms.deleteRoom(id)
    io.emit("updateRoomsList", { rooms: Rooms.getRooms() })
    return true
  }
  getRoom(id) {
    const room = Rooms.getRoom(id)
    return room
  }
  getRooms() {
    let rooms = Rooms.getRooms()
    rooms = rooms.map((room) => {
      return new RoomDto(room)
    })
    return rooms
  }
  joinRoom(id, password, userId) {
    let room = Rooms.getRoom(id)
    if (room.password != password) {
      throw ApiError.BadRequest(`Пароль не вірний`)
    }
    Rooms.connectToRoom(id, userId)
    return room
  }
}
module.exports = new RoomService()
