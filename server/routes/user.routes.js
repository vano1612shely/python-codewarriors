const Router = require("express")
const userController = require("../controllers/user.controller")
const router = new Router()
const { body } = require("express-validator")
const AuthMiddleware = require("../middleware/auth-middleware")
const RoleMiddleware = require("../middleware/role-middleware")
router.post(
  "/registration",
  body("login").isLength({ min: 3, max: 30 }),
  body("password").isLength({ min: 6, max: 50 }),
  body("email").isEmail(),
  userController.createUser
)
router.post("/login", userController.login)
router.get("/logout", userController.logout)
router.get("/refresh", userController.refresh)
router.get("/getUsers", AuthMiddleware, userController.getUsers)
router.get("/getUser", AuthMiddleware, userController.getUser)
router.get("/getTop10", AuthMiddleware, userController.getTop10)
router.delete(
  "/deleteUser",
  AuthMiddleware,
  RoleMiddleware,
  userController.deleteUser
)
router.put(
  "/updateUser",
  AuthMiddleware,
  body("password").notEmpty(),
  body("role").notEmpty(),
  body("login").isLength({ min: 3, max: 30 }),
  userController.updateUser
)

module.exports = router
