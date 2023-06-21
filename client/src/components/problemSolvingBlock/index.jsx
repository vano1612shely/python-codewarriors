import "./style.css"
import CodeTextBox from "../CodeTextBox"
import { useState, useEffect } from "react"
import TestsResult from "../testsResult"
const ProblemSolvingBlock = ({ task, sendCode, tests, setTests }) => {
  const [code, setCode] = useState("")
  const sendCodeHandler = () => {
    sendCode(code)
    setTests([])
  }
  return (
    <div>
      <div className="task_text">
        <h1 className="tast_text_title">{task.name}</h1>
        {task.text}
      </div>
      <div className="task_code_block">
        <CodeTextBox onChange={setCode} value={code}></CodeTextBox>
        <button onClick={sendCodeHandler} className="send_task_code_button">
          Перевірити
        </button>
      </div>
      <div className="task_tests_block">
        <TestsResult tests={tests} />
      </div>
    </div>
  )
}

export default ProblemSolvingBlock
