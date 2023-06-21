import "./style.css"

const TestsResult = ({ tests }) => {
  return (
    <div className="tests_result_block">
      <h1 className="tests_result_block_title">Тести:</h1>
      <ul className="tests_result_list">
        {tests.map((test, index) => {
          return (
            <li
              key={index}
              className={
                test.your_result == test.correct_result
                  ? "tests_result_list_item  tests_result_list_item_correct"
                  : "tests_result_list_item "
              }
            >
              Тест №{index + 1}:{" "}
              {test.your_result == test.correct_result
                ? "Пройдено"
                : "Провалено"}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TestsResult
