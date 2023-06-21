import TasksService from "../../services/tasks.service"
import DifficultyLevelPicker from "../DifficultyLevelPicker"
import "./style.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as Trash } from "../../img/trash.svg"
const TasksList = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    const getData = async () => {
      const response = await TasksService.getTasks()
      if (response) {
        console.log(response.data)
        setList(response.data)
      }
    }
    getData()
  }, [])
  const deleteTask = async (id) => {
    const response = await TasksService.deleteTask(id)
    let newList = list.map((item) => {
      if (item.id != id) {
        return item
      }
    })
    newList = newList.filter((item) => item !== undefined)
    console.log(newList)
    setList(newList)
  }
  return (
    <div className="tasks_list_block">
      <ul className="tasks_list">
        {list.map((item, index) => {
          return (
            <li className="tasks_list_item" key={index}>
              <Link to={"/task/" + item.id} className="tasks_list_item_link">
                <span className="tasks_list_item_name">{item.name}</span>
                <DifficultyLevelPicker
                  stages={3}
                  value={item.difficulty_level}
                  disabled={true}
                />
              </Link>
              <button
                className="tasks_list_item_button"
                onClick={() => deleteTask(item.id)}
              >
                Видалити <Trash className="tasks_list_item_button_img" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TasksList
