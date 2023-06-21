const db = require("../db")
const roomService = require("../services/room.service")
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")
class RoomController {
  async createRoom(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Помилка валідації", errors.array()))
      }
      const { name, password, level } = req.body
      const { refreshToken } = req.cookies
      const user = await userService.checkUser(refreshToken)
      const id = await roomService.createRoom(name, password, level, user.id)
      res.status(200).json({ id })
    } catch (e) {
      next(e)
    }
  }
  async joinRoom(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Помилка валідації", errors.array()))
      }
      const { id, password } = req.body
      const { refreshToken } = req.cookies
      const user = await userService.checkUser(refreshToken)
      const room = await roomService.joinRoom(id, password, user.id)
      res.status(200).json({ room })
    } catch (e) {
      next(e)
    }
  }
  async getRoom(req, res, next) {
    try {
      const { id } = req.query

      const room = await roomService.getRoom(id)
      res.status(200).json({ room })
    } catch (e) {
      next(e)
    }
  }
  async getRooms(req, res, next) {
    try {
      const rooms = await roomService.getRooms()
      res.status(200).json({ rooms })
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new RoomController()
