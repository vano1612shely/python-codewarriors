const bcrypt = require("bcryptjs")
const db = require("../db")
const UserDto = require("../dtos/user.dto")
const tokenService = require("./token.service")
const ApiError = require("../exceptions/api-error")
class UserService {
  async createUser(email, login, password) {
    const candidate = await db.query("SELECT * FROM users WHERE login = $1", [
      login,
    ])
    if (candidate.rows.length != 0) {
      throw ApiError.BadRequest(
        `Користувач з логіном ${login} вже зареєстрований, виберіть інший`
      )
    }
    const hashPassword = await bcrypt.hash(password, 9)
    const user = await db.query(
      "INSERT INTO users(email, login, password, role) VALUES($1, $2, $3, 'user') RETURNING *",
      [email, login, hashPassword]
    )
    const userDto = new UserDto(user.rows[0])
    return {
      user: userDto,
    }
  }
  async login(login, password) {
    const candidate = await db.query("SELECT * FROM users WHERE login = $1", [
      login,
    ])
    if (candidate.rows.length == 0) {
      throw ApiError.BadRequest(`Користувача з логіном ${login} не знайдено`)
    }
    const user = candidate.rows[0]
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Пароль не вірний`)
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizeError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizeError()
    }
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      userData.id,
    ])
    const userDto = new UserDto(user.rows[0])
    const tokens = tokenService.generateToken({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto,
    }
  }
  async getUsersList() {
    const usersData = await db.query("SELECT * FROM users")
    let usersList = []
    for (let i = 0; i < usersData.rows.length; i++) {
      usersList.push(new UserDto(usersData.rows[i]))
    }
    return usersList
  }
  async getUser(id) {
    const userData = await db.query("SELECT * FROM users WHERE id = $1", [id])
    return new UserDto(userData.rows[0])
  }
  async getTop10() {
    const usersData = await db.query(
      "SELECT * FROM users ORDER BY points DESC LIMIT 10;"
    )
    let usersList = []
    for (let i = 0; i < usersData.rows.length; i++) {
      usersList.push(new UserDto(usersData.rows[i]))
    }
    return usersList
  }
  async deleteUser(id) {
    await tokenService.removeTokenByUser(id)
    const userData = await db.query("DELETE FROM users WHERE id = $1", [id])
  }
  async addPoints(id, points, win = false) {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id])
    const newPoints = user.rows[0].points + points
    const wins = win ? user.rows[0].wins + 1 : user.rows[0].wins
    const fights = user.rows[0].fights + 1
    await db.query(
      "UPDATE users SET points=$2, fights=$3, wins=$4 WHERE id = $1",
      [id, newPoints, fights, wins]
    )
  }
  async updateUser(id, login, role, password, newPassword) {
    const candidate = await db.query("SELECT * FROM users WHERE id = $1", [id])
    const user = candidate.rows[0]
    if (!user) {
      throw ApiError.BadRequest("Undefined user")
    }
    const usersByLogin = await db.query(
      "SELECT * FROM users WHERE login = $1",
      [login]
    )
    for (let i = 0; i < usersByLogin.rows; i++) {
      if (usersByLogin.id != id) {
        throw ApiError.BadRequest(`User with login ${login} already exists`)
      }
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Пароль не вірний`)
    }
    let hashPassword
    if (newPassword == null) {
      hashPassword = await bcrypt.hash(password, 9)
    } else {
      hashPassword = await bcrypt.hash(newPassword, 9)
    }
    const userData = await db.query(
      "UPDATE users SET login = $2, role = $3, password = $4 WHERE id = $1 RETURNING *",
      [id, login, role, hashPassword]
    )
    await tokenService.removeTokenByUser(id)
    const userDto = new UserDto(userData.rows[0])
    return userDto
  }
  async checkUser(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken)
    if (!userData) {
      throw ApiError.BadRequest("В доступі відмовлено")
    }
    const role = await db.query("SELECT * FROM users WHERE id = $1", [
      userData.id,
    ])
    return role.rows[0]
  }
}

module.exports = new UserService()
