import "./style.css"

const AddNewTaskButton = ({ setId, setTaskData, taskData }) => {
  return (
    <button
      className="add_new_task_button"
      onClick={() => {
        setId(null)
        setTaskData(taskData)
      }}
    >
      Додати нову задачу
    </button>
  )
}

export default AddNewTaskButton
