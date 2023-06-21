const Router = require("express")
const TestsController = require("../controllers/tests.controller")
const router = new Router()
const { body } = require("express-validator")
const AuthMiddleware = require("../middleware/auth-middleware")
const RoleMiddleware = require("../middleware/role-middleware")
router.post(
  "/create",
  AuthMiddleware,
  RoleMiddleware,
  TestsController.createTest
)
router.post(
  "/delete",
  AuthMiddleware,
  RoleMiddleware,
  TestsController.deleteTest
)
router.get("/getTests", AuthMiddleware, TestsController.getTests)
router.get("/getTest", AuthMiddleware, TestsController.getTest)
module.exports = router
