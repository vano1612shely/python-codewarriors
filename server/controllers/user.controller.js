const userService = require("../services/user.service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")
class UserController {
  async createUser(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Помилка валідації", errors.array()))
      }
      const { login, email, password } = req.body
      const userData = await userService.createUser(email, login, password)
      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body
      const userData = await userService.login(login, password)
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie("refreshToken")
      res.status(200).json(token)
    } catch (e) {
      next(e)
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(200).json(userData)
    } catch (e) {
      next(e)
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsersList(req.body.id)
      res.status(200).json(users)
    } catch (e) {
      next(e)
    }
  }
  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.query.id)
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
  async getTop10(req, res, next) {
    try {
      const user = await userService.getTop10()
      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Помилка валідації", errors.array()))
      }
      const { id, login, role, password, newPassword } = req.body
      const { refreshToken } = req.cookies
      const user = await userService.checkUser(refreshToken)
      if (user.id != id) {
        return next(ApiError.BadRequest("В доступі відмовлено"))
      }
      const data = await userService.updateUser(
        id,
        login,
        role,
        password,
        newPassword
      )
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }
  async deleteUser(req, res, next) {
    try {
      const data = await userService.deleteUser(req.query.id)
      res.status(200).json({ status: "ok" })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()
