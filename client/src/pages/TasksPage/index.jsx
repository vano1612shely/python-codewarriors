import "./style.css"
import Tabs from "../../components/Tabs"
import Menu from "../../components/menu"
import AddTests from "../../components/addTests"
import MainContainer from "../../components/MainContainer"
import AddTask from "../../components/addTask"
import { useState } from "react"
import TasksList from "../../components/tasksList"
import AddNewTaskButton from "../../components/addNewTaskButton"
const TasksPage = () => {
  const [tab, setTab] = useState("Додати")
  const [taskId, setTaskId] = useState(null)
  const [taskData, setTaskData] = useState({
    name: "",
    text: "",
    difficulty_level: 1,
    points: 0,
    id: taskId,
  })
  return (
    <>
      <Menu />
      <MainContainer>
        <Tabs
          tabs={["Додати", "Переглянути задачі"]}
          handler={setTab}
          style={{ marginBottom: 20 }}
        />
        <div className="tasks_wrapper">
          {tab == "Додати" ? (
            <AddTask setId={setTaskId} start_data={taskData} taskId={taskId} />
          ) : (
            ""
          )}
          {tab == "Додати" && taskId ? <AddTests taskId={taskId} /> : ""}
          {tab == "Додати" && taskId ? (
            <AddNewTaskButton
              setId={setTaskId}
              setTaskData={setTaskData}
              taskData={taskData}
            />
          ) : (
            ""
          )}
        </div>
        {tab == "Переглянути задачі" ? <TasksList /> : ""}
      </MainContainer>
    </>
  )
}

export default TasksPage
