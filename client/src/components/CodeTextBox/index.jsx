import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { githubDark } from "@uiw/codemirror-theme-github"
import { useEffect } from "react"
function CodeTextBox({ onChange, value }) {
  return (
    <CodeMirror
      value={value}
      height="350px"
      onChange={onChange}
      theme={githubDark}
      extensions={[python()]}
    />
  )
}

export default CodeTextBox
