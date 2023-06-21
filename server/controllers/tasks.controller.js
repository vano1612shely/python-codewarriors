const db = require("../db")
const TasksService = require("../services/tasks.service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")
class TaskController {
  async createTask(req, res, next) {
    try {
      const { name, text, difficulty_level, points } = req.body
      const result = await TasksService.createTask(
        name,
        text,
        difficulty_level,
        points
      )
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }
  async updateTask(req, res, next) {
    try {
      const { id, name, text, difficulty_level, points } = req.body
      const result = await TasksService.updateTask(
        id,
        name,
        text,
        difficulty_level,
        points
      )
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }
  async getTask(req, res, next) {
    try {
      const { id } = req.query
      const task = await TasksService.getTask(id)
      res.status(200).json(task)
    } catch (e) {
      next(e)
    }
  }
  async getTasks(req, res, next) {
    try {
      const tasks = await TasksService.getTasks()
      res.status(200).json(tasks)
    } catch (e) {
      next(e)
    }
  }
  async deleteTask(req, res, next) {
    try {
      const { id } = req.body
      const task = await TasksService.deleteTask(id)
      res.status(200).json(true)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new TaskController()
