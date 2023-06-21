module.exports = class UserDto {
  login
  id
  game_count
  wins_count
  points
  role
  created_at

  constructor(model) {
    this.id = model.id
    this.login = model.login
    this.fights = model.fights
    this.wins = model.wins
    this.created_at = model.created_at
    this.points = model.points
    this.role = model.role
  }
}
