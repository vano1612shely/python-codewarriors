import "./style.css"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
function CodeBlock(props) {
  return (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        language={"py"}
        style={tomorrow}
        className="code-block"
      >
        {props.children}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
