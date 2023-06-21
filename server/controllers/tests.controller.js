const db = require("../db")
const TestsService = require("../services/tests.service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")
class TestsController {
  async createTest(req, res, next) {
    try {
      const { task_id, params, result } = req.body
      const data = await TestsService.createTest(task_id, params, result)
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }
  async deleteTest(req, res, next) {
    try {
      const { id } = req.body
      const data = await TestsService.deleteTest(id)
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }
  async getTests(req, res, next) {
    try {
      const { task_id } = req.query
      const tests = await TestsService.getTests(task_id)
      res.status(200).json(tests)
    } catch (e) {
      next(e)
    }
  }
  async getTest(req, res, next) {
    try {
      const { id } = req.query
      const tests = await TestsService.getTest(id)
      res.status(200).json(tests)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new TestsController()
