const jwt = require("jsonwebtoken")
const db = require("../db")
class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await db.query(
      "SELECT * FROM tokens WHERE user_id = $1",
      [userId]
    )
    if (tokenData.rows.length != 0) {
      const updateData = await db.query(
        "UPDATE tokens SET refreshToken = $2 WHERE user_id = $1 RETURNING *",
        [userId, refreshToken]
      )
      return updateData.rows[0]
    }
    const createData = await db.query(
      "INSERT INTO tokens(user_id, refreshToken) VALUES($1,$2) RETURNING *",
      [userId, refreshToken]
    )
    return createData.rows[0]
  }
  async removeToken(refreshToken) {
    const tokenData = await db.query(
      "DELETE FROM tokens WHERE refreshToken = $1",
      [refreshToken]
    )
    return tokenData.rows
  }
  async removeTokenByUser(id) {
    const tokenData = await db.query("DELETE FROM tokens WHERE user_id = $1", [
      id,
    ])
    return tokenData.rows
  }
  async findToken(refreshToken) {
    const tokenData = await db.query(
      "SELECT * FROM tokens WHERE refreshToken = $1",
      [refreshToken]
    )
    return tokenData.rows[0]
  }

  async findTokenByUser(id) {
    const tokenData = await db.query(
      "SELECT * FROM tokens WHERE user_id = $1",
      [id]
    )
    return tokenData.rows[0]
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()
