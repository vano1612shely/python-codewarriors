require("dotenv").config()
const socketio = require("socket.io")

let io
module.exports = {
  init: function (server) {
    io = socketio(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    })
    return io
  },
  getIO: function () {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()")
    }
    return io
  },
}
