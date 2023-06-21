const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token.service')
const db = require('../db')

module.exports = async (req, res, next) => {
  try {
    const user = req.user
    const userData = await db.query('SELECT * FROM users WHERE id = $1', [
      user.id,
    ])
    if (userData.rows[0].role != 'admin') {
      return next(ApiError.BadRequest('Only available to admin'))
    }
    next()
  } catch (e) {
    return next(ApiError.UnauthorizeError())
  }
}
