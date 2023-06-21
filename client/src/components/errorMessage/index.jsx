import "./style.css"
const ErrorMessage = ({ message, status = 200 }) => {
  return (
    <div className={`error-block${status === 200 ? " not" : " err"}`}>
      <p className={`error-text${status === 200 ? " not-txt" : " err-txt"}`}>
        {message}
      </p>
    </div>
  )
}

export default ErrorMessage
