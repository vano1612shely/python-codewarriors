module.exports = class RoomDto {
  id
  name
  level
  status
  constructor(model) {
    this.id = model.id
    this.name = model.name
    this.level = model.level
    this.status = model.status
  }
}
