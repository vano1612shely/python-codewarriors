import "./style.css"
import { useNavigate } from "react-router-dom"
import RoomsService from "../../services/rooms.service"
import { useEffect, useState } from "react"
import DifficultyLevelPicker from "../DifficultyLevelPicker"
import Modal from "../Modal"
import ErrorMessage from "../errorMessage"
import io from "socket.io-client"
const ModalContent = ({ roomId }) => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [respStatus, setRespStatus] = useState("")
  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 5000)
  }, [error])
  const joinToRoomHandler = async (e) => {
    e.preventDefault()
    const result = await RoomsService.joinToRoom(roomId, password)
    if (result.status !== 200) {
      let msg
      if (result.data.message) {
        msg = result.data.message
      } else {
        msg = result.statusText
      }

      setPassword("")
      setError(msg)
    }
    if ("room" in result.data) {
      navigate("/room/" + roomId)
    } else {
    }
  }
  return (
    <>
      <form className="join_room_form" onSubmit={joinToRoomHandler}>
        <input
          type="password"
          className="join_room_form_input"
          placeholder="Введіть пароль: "
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button type="submit" className="join_room_form_button">
          Підключитись
        </button>
      </form>
      {!error ? null : <ErrorMessage message={error} status={respStatus} />}
    </>
  )
}
const JoinRoom = () => {
  const [rooms, setRooms] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [id, setId] = useState(null)
  useEffect(() => {
    const getRooms = async () => {
      const response = await RoomsService.getRooms()
      if (response) {
        if ("data" in response && "rooms" in response.data) {
          setRooms(response.data.rooms)
        }
      }
    }
    let socket = io("http://localhost:5000", {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
    socket.on("updateRoomsList", ({ rooms }) => {
      setRooms(rooms)
    })
    getRooms()
  }, [])
  return (
    <>
      <div className="join_room_block">
        <h2 className="join_room_block_title">Кімнати:</h2>
        <ul className="join_room_list">
          {rooms.map((room, index) => {
            return (
              <li className="join_room_item" key={index}>
                <span>{room.name}</span>
                <DifficultyLevelPicker
                  stages={3}
                  value={room.level}
                  disabled={true}
                />
                <button
                  className="join_room_item_button"
                  onClick={() => {
                    setId(room.id)
                    setOpenModal(true)
                  }}
                >
                  Приєднатись
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <Modal
        visible={openModal}
        size={[300, 200]}
        closeHandler={() => setOpenModal(false)}
        content={<ModalContent roomId={id} />}
      />
    </>
  )
}

export default JoinRoom
