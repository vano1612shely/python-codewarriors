require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const http = require("http")
const server = http.Server(app)
const sio = require("./sockets.js")
sio.init(server)
const userRouter = require("./routes/user.routes")
const roomRouter = require("./routes/room.routes")
const tasksRouter = require("./routes/tasks.routes.js")
const PORT = process.env.PORT || 5000
const errorMiddleware = require("./middleware/error-middleware")
const testsRouter = require("./routes/tests.routes.js")
const CodeService = require("./services/code.service.js")
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use("/api/users", userRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/tasks", tasksRouter)
app.use("/api/tests", testsRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
