import "./style.css"
import TasksService from "../../services/tasks.service"
import DifficultyLevelPicker from "../DifficultyLevelPicker"
import ErrorMessage from "../errorMessage"
import { useState, useEffect } from "react"
const AddTask = ({
  start_data = { name: "", text: "", difficulty_level: 1, points: 0, id: null },
  setId = null,
  taskId = null,
}) => {
  const [data, setData] = useState(start_data)
  useEffect(() => {
    if (!taskId) setData(start_data)
  }, [taskId])
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  const updateTaskHandler = async (e) => {
    e.preventDefault()
    const result = await TasksService.updateTask(
      data.id,
      data.name,
      data.text,
      data.difficulty_level,
      data.points
    )
    if (!result) {
      setMessage("Не вдалаось з'єднатись з сервером")
      setStatus(500)
      return 0
    }
    setStatus(result.status)
    if (result.status == 200) {
      setMessage("Завдання оновлено")
    } else {
      setMessage("Не вдалось оновити завдання")
    }
  }
  const createTaskHandler = async (e) => {
    e.preventDefault()
    const result = await TasksService.createTask(
      data.name,
      data.text,
      data.difficulty_level,
      data.points
    )
    if (!result) {
      setMessage("Не вдалаось з'єднатись з сервером")
      setStatus(500)
      return 0
    }
    setStatus(result.status)
    if (result.status == 200) {
      setMessage("Нове завдання додано")
      if (setId != null) setId(result.data.id)
      setData({ ...data, id: result.data.id })
    } else {
      setMessage("Не вдалось створити нову задачу")
    }
    console.log(data)
  }
  useEffect(() => {
    setTimeout(() => {
      setMessage(false)
    }, 3000)
  }, [message])
  return (
    <>
      <div className="add_task_section">
        <form
          className="add_task_form"
          onSubmit={(e) => {
            if (data.id) {
              updateTaskHandler(e)
            } else {
              createTaskHandler(e)
            }
          }}
        >
          <input
            type="text"
            className="add_task_input"
            name="name"
            id="name"
            placeholder="Назва завдання:"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            required
          />
          <textarea
            type="text"
            className="add_task_input add_task_textarea"
            name="name"
            id="name"
            placeholder="Текст завдання:"
            onChange={(e) => setData({ ...data, text: e.target.value })}
            value={data.text}
            required
          ></textarea>
          <DifficultyLevelPicker
            stages={3}
            onChange={(value) => setData({ ...data, difficulty_level: value })}
            value={data.difficulty_level}
          />
          <input
            type="number"
            className="add_task_input"
            name="points"
            id="points"
            min={1}
            max={20}
            placeholder="Кількість балів:"
            onChange={(e) => setData({ ...data, points: e.target.value })}
            value={data.points}
            required
          />
          <button type="submit" className="add_task_button">
            {data.id ? "Оновити" : "Додати"}
          </button>
        </form>
      </div>
      {!message ? null : <ErrorMessage message={message} status={status} />}
    </>
  )
}

export default AddTask
