import "./style.css"
import { useState } from "react"
import RoomsService from "../../services/rooms.service"
import DifficultyLevelPicker from "../DifficultyLevelPicker"
import { Navigate } from "react-router"
const CreateRoom = () => {
  const [data, setData] = useState({ name: "", password: "", level: 1 })
  const [roomId, setRoomId] = useState(null)
  const createRoomHandler = async (e) => {
    e.preventDefault()
    const roomData = await RoomsService.createRoom(
      data.name,
      data.password,
      data.level
    )
    if (roomData && "data" in roomData && roomData.data.id) {
      setRoomId(roomData.data.id)
    }
  }
  const setDifficultyLevel = (value) => {
    setData({ ...data, level: value })
  }
  return (
    <div className="create_room_block">
      <h2 className="create_room_block_title">Створити кімнату:</h2>
      <form className="create_rooom_form" onSubmit={createRoomHandler}>
        <input
          type="text"
          className="create_room_form_input"
          required
          placeholder="Назва:"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="password"
          className="create_room_form_input"
          required
          placeholder="Пароль:"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <DifficultyLevelPicker
          stages={3}
          onChange={setDifficultyLevel}
          value={data.level}
        />
        <button type="submit" className="create_room_form_button">
          Створити
        </button>
      </form>
      {roomId ? <Navigate to={`/room/${roomId}`} /> : ""}
    </div>
  )
}

export default CreateRoom
