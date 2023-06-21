const Router = require("express")
const RoomController = require("../controllers/room.controller")
const router = new Router()
const { body } = require("express-validator")
const AuthMiddleware = require("../middleware/auth-middleware")
const RoleMiddleware = require("../middleware/role-middleware")
router.post(
  "/create",
  body("name").notEmpty(),
  body("password").notEmpty(),
  body("level").isInt(),
  AuthMiddleware,
  RoomController.createRoom
)
router.post(
  "/join",
  body("id").notEmpty(),
  body("password").notEmpty(),
  AuthMiddleware,
  RoomController.joinRoom
)
router.get("/getRoom", AuthMiddleware, RoomController.getRoom)
router.get("/getRooms", AuthMiddleware, RoomController.getRooms)
module.exports = router
