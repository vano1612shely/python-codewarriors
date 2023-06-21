import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ReactComponent as Logo } from "../../img/logo.svg"
import authService from "../../services/auth.service"
import ErrorMessage from "../../components/errorMessage"
import { useDispatch } from "react-redux"
import "./style.css"
const LoginPage = () => {
  const [data, setData] = useState({
    login: "",
    password: "",
  })
  const [error, setError] = useState(false)
  const [respStatus, setRespStatus] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    document.body.classList.add("login_background")
    return () => {
      document.body.classList.remove("login_background")
    }
  }, [])
  const loginHandler = async (e) => {
    e.preventDefault()
    if (data.login === "") {
      setError("Введіть логін")
      return 0
    }
    if (data.password === "") {
      setError("Введіть пароль")
      return 0
    }
    const userData = await authService.login(data.login, data.password)
    if (!userData) {
      setRespStatus(500)
      setError("Не вдалось з'єднатись з сервером, спробуйте пізніше")
      return 0
    }
    setRespStatus(userData.status)
    if (userData.data.user) {
      dispatch({ type: "SET_AUTH", payload: true })
      dispatch({ type: "SET_USER", payload: userData.data.user })
      navigate("/rooms")
    }

    if (userData.status !== 200) {
      let msg
      if (userData.data.message) {
        msg = userData.data.message
      } else {
        msg = userData.statusText
      }

      setData({ ...data, password: "" })
      setError(msg)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setError(false)
    }, 5000)
  }, [error])
  return (
    <>
      <div className="auth_wrapper">
        <div className="auth_form">
          <Link to="/" className="auth_form_logo_link">
            <Logo className="auth_form_logo" />
          </Link>
          <form className="auth_form" onSubmit={loginHandler}>
            <div className="auth_form_row">
              <label htmlFor="login" className="auth_form_label">
                Логін
              </label>
              <input
                type="text"
                className="auth_form_input"
                name="login"
                id="login"
                required
                value={data.login}
                onChange={(e) => setData({ ...data, login: e.target.value })}
              />
            </div>
            <div className="auth_form_row">
              <label htmlFor="password" className="auth_form_label">
                Пароль
              </label>
              <input
                type="password"
                className="auth_form_input"
                name="password"
                id="password"
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button type="submit" className="auth_form_button">
              Війти
            </button>
            <Link to="/registration" className="auth_form_link">
              Зареєструватись
            </Link>
          </form>
        </div>
      </div>
      {!error ? null : <ErrorMessage message={error} status={respStatus} />}
    </>
  )
}

export default LoginPage
