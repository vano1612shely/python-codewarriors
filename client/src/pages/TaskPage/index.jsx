import "./style.css"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Menu from "../../components/menu"
import MainContainer from "../../components/MainContainer"
import TasksService from "../../services/tasks.service"
import AddTask from "../../components/addTask"
import AddTests from "../../components/addTests"
const TaskPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const checkTask = async () => {
      const result = await TasksService.getTask(id)
      if (result.data) {
        setData(result.data)
      } else {
        navigate("/tasks")
      }
    }
    checkTask()
  }, [])
  return (
    <>
      <Menu />
      <MainContainer>
        <div className="tasks_wrapper">
          {data ? <AddTask taskId={id} start_data={data} /> : ""}
          {data ? <AddTests taskId={id} /> : ""}
        </div>
      </MainContainer>
    </>
  )
}

export default TaskPage
