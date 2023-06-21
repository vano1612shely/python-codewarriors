import Menu from "../../components/menu"
import "./style.css"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import RoomsService from "../../services/rooms.service"
import MainContainer from "../../components/MainContainer"
import io from "socket.io-client"
import ProblemSolvingBlock from "../../components/problemSolvingBlock"
const RoomPage = () => {
  let socket = null
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [task, setTask] = useState(null)
  const [tests, setTests] = useState([])
  const [finish, setFinish] = useState(false)
  const [taskComplited, setTaskComplited] = useState(false)
  const userId = useSelector((state) => state.user.id)
  const navigate = useNavigate()
  useEffect(() => {
    const checkRoom = async () => {
      const result = await RoomsService.getRoom(id)
      if (result.data.room && result.data.room.name) {
        socket = io("http://localhost:5000", {
          withCredentials: true,
          extraHeaders: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        })
        socket.emit("joinRoom", { id, userId })
        socket.on("joinedToRoom", (room) => {
          setRoom(room)
          if (room.status == "start") {
            socket.emit("getTask", room.id)
          }
          localStorage.setItem("roomId", room.id)
        })
        socket.on("startGame", (room) => {
          setRoom(room)
        })
        socket.on("sendTask", (task) => {
          setTask(task)
          setTests([])
          setTaskComplited(false)
        })
        socket.on("finish", ({ winner, points }) => {
          setFinish({ winner, points })
          localStorage.removeItem("roomId")
        })
        socket.on("connectionRefused", () => {
          navigate("/rooms")
        })
      } else {
        localStorage.removeItem("roomId")
        navigate("/rooms")
      }
    }
    checkRoom()
  }, [])
  const sendCode = (code) => {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
    socket.emit("sendCode", { code, id, userId })
    socket.on("sendTest", ({ correct_result, your_result }) => {
      setTests((tests) => [...tests, { correct_result, your_result }])
    })
    socket.on("taskComplited", () => {
      setTaskComplited(true)
      setTimeout(() => {
        setTaskComplited(false)
      }, 1)
    })
  }
  if (!finish) {
    return (
      <>
        <Menu />
        <MainContainer>
          {room && room.status == "waiting" ? (
            <span className="room_waiting_message">Очікування опонента</span>
          ) : (
            ""
          )}
          {room && room.status == "start" && task && !taskComplited ? (
            <ProblemSolvingBlock
              task={task}
              sendCode={sendCode}
              tests={tests}
              setTests={setTests}
            />
          ) : (
            ""
          )}
          {room && room.status == "start" && task && taskComplited
            ? "Очікуємо завершення від опонента"
            : ""}
        </MainContainer>
      </>
    )
  } else {
    return (
      <div className="room_winner">
        Переміг гравець {finish.winner} з кількістю балів: {finish.points}
        <br />
        <button onClick={() => navigate("/rooms")}>Покинути кімнату</button>
      </div>
    )
  }
}

export default RoomPage
