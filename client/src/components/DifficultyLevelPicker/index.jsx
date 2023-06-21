import "./style.css"
import { useState, useEffect } from "react"
import { ReactComponent as Star } from "../../img/star.svg"
const DifficultyLevelPicker = ({
  stages,
  onChange,
  value = null,
  disabled = false,
}) => {
  const stagesList = [...Array(stages).keys()].map((stage) => stage + 1)
  const [clickedButton, setClickedButton] = useState(value)
  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId)
  }
  useEffect(() => {
    setClickedButton(value)
  }, [value])
  return (
    <div className="difficulty_level_picker">
      {stagesList.map((item, index) => {
        return (
          <button
            disabled={disabled}
            type="button"
            key={index + 1}
            value={index + 1}
            className={`difficulty_level_picker_button ${
              clickedButton >= index + 1
                ? "difficulty_level_picker_button__clicked"
                : ""
            } ${disabled ? "" : "difficulty_level_picker_button_hover"}`}
            onClick={() => {
              handleButtonClick(index + 1)
              onChange(item)
            }}
          >
            <Star className="difficulty_level_picker_button_img" />
          </button>
        )
      })}
    </div>
  )
}

export default DifficultyLevelPicker
