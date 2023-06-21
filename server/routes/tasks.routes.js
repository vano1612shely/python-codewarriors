const Router = require("express")
const TasksController = require("../controllers/tasks.controller")
const router = new Router()
const { body } = require("express-validator")
const AuthMiddleware = require("../middleware/auth-middleware")
const RoleMiddleware = require("../middleware/role-middleware")
router.post(
  "/create",
  AuthMiddleware,
  RoleMiddleware,
  TasksController.createTask
)
router.post(
  "/update",
  AuthMiddleware,
  RoleMiddleware,
  TasksController.updateTask
)
router.get("/getTask", AuthMiddleware, TasksController.getTask)
router.get("/getTasks", AuthMiddleware, TasksController.getTasks)
router.post(
  "/delete",
  AuthMiddleware,
  RoleMiddleware,
  TasksController.deleteTask
)
module.exports = router
