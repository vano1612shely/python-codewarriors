const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token.service')
module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizeError())
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizeError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizeError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.UnauthorizeError())
  }
}
