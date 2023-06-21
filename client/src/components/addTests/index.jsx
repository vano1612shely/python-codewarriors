import "./style.css"
import TasksService from "../../services/tasks.service"
import { useState, useEffect } from "react"
import TestsService from "../../services/tests.service"
import ErrorMessage from "../errorMessage"
const AddTestForm = ({
  startValues = {
    values: [],
    result: "",
  },
  handler,
  testId = null,
}) => {
  const [data, setData] = useState(startValues)
  const [id, setId] = useState(testId)
  const [isDeleted, setIsDeleted] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 5000)
  }, [error])
  return !isDeleted ? (
    <>
      <form
        className="add_test_form"
        onSubmit={async (e) => {
          e.preventDefault()
        }}
      >
        <input
          type="text"
          className="add_test_form_input"
          value={data.values.join(";")}
          onChange={(e) => {
            setData({ ...data, values: e.target.value.split(",") })
          }}
          placeholder="Вхідні дані: "
          required
        />
        <input
          type="text"
          className="add_test_form_input"
          value={data.result}
          onChange={(e) => {
            setData({ ...data, result: e.target.value })
          }}
          placeholder="Вихідні дані: "
          required
        />
        {!id ? (
          <button
            className="add_test_form_button"
            onClick={() => {
              let error = false
              const transformedArray = data.values.map((str) => {
                let newStr = str.trim()
                try {
                  return JSON.parse(newStr)
                } catch {
                  error = true
                }
              })
              const transformResult = () => {
                try {
                  return JSON.parse(data.result)
                } catch {
                  error = true
                }
              }
              const transformedResult = transformResult()
              if (error) {
                setError(
                  "Невірний формат для конвертації в Json, перевірте введені дані"
                )
                return false
              }
              const transformedData = {
                ...data,
                values: transformedArray,
                result: transformedResult,
              }
              handler(transformedData, setId)
            }}
          >
            Додати
          </button>
        ) : (
          <button
            className="delete_test_form_button"
            onClick={async () => {
              await TestsService.deleteTest(id)
              setIsDeleted(true)
            }}
          >
            Видалити
          </button>
        )}
      </form>
      {!error ? null : <ErrorMessage message={error} status={400} />}
    </>
  ) : (
    ""
  )
}
const AddTests = ({ taskId }) => {
  const [taskName, setTaskName] = useState(null)
  const [tests, setTests] = useState([])
  useEffect(() => {
    const getTask = async () => {
      const result = await TasksService.getTask(taskId)
      if (result) {
        setTaskName(result.data.name)
      }
      const tests = await TestsService.getTests(taskId)
      if (tests) {
        console.log(tests.data)
        let d = tests.data.map((item) => {
          return {
            id: item.id,
            taskId: item.task_id,
            values: JSON.parse(item.params),
            result: JSON.parse(item.result),
          }
        })
        setTests(d)
      }
    }
    getTask()
  }, [taskId])
  const addTest = () => {
    const newTest = {
      taskId,
      values: [],
      result: "",
    }
    setTests((prevTests) => [...prevTests, newTest])
  }
  const addTestHandler = async (data, func) => {
    const response = await TestsService.createTest(
      data.taskId,
      data.values,
      data.result
    )
    func(response.data.id)
  }
  return (
    <>
      <div className="tests_block">
        <h2 className="tests_block_title">
          Додати тести для задачі {taskName}:
        </h2>
        <div className="tests_block_wrapper">
          {tests.length != 0
            ? tests.map((test, index) => (
                <AddTestForm
                  key={index}
                  startValues={test}
                  handler={addTestHandler}
                  testId={test.id ? test.id : null}
                />
              ))
            : ""}
        </div>
        <button className="add_test_btn" onClick={addTest}>
          +
        </button>
      </div>
    </>
  )
}

export default AddTests
