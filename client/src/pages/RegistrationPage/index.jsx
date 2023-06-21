import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from "../../img/logo.svg"
import { useState, useEffect } from "react"
import ErrorMessage from "../../components/errorMessage"
import authService from "../../services/auth.service"
import "./style.css"
const RegistrationPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    login: "",
    password: "",
  })
  const [message, setMessage] = useState(false)
  const [respStatus, setRespStatus] = useState(400)
  useEffect(() => {
    document.body.classList.add("login_background")
    return () => {
      document.body.classList.remove("login_background")
    }
  }, [])
  const registrationHandler = async (e) => {
    e.preventDefault()
    const userData = await authService.registration(
      data.email,
      data.login,
      data.password
    )
    if (!userData) {
      setRespStatus(500)
      setMessage("Не вдалось з'єднатись з сервером, спробуйте пізніше")
      return 0
    }
    setRespStatus(userData.status)
    if (userData.data.user) {
      setMessage("Користувача зареєстровано")
      setTimeout(() => {
        navigate("/login")
      }, 5000)
    }

    if (userData.status !== 200) {
      let msg
      if (userData.data.message) {
        msg = userData.data.message
      } else {
        msg = userData.statusText
      }

      setData({ ...data, password: "" })
      setMessage(msg)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setMessage(false)
    }, 3000)
  }, [message])

  return (
    <>
      <div className="auth_wrapper">
        <div className="auth_form">
          <Link to="/" className="auth_form_logo_link">
            <Logo className="auth_form_logo" />
          </Link>
          <form className="auth_form" onSubmit={registrationHandler}>
            <div className="auth_form_row">
              <label htmlFor="mail" className="auth_form_label">
                Пошта
              </label>
              <input
                type="email"
                className="auth_form_input"
                name="mail"
                id="mail"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value })
                }}
                required
              />
            </div>
            <div className="auth_form_row">
              <label htmlFor="login" className="auth_form_label">
                Логін
              </label>
              <input
                type="text"
                className="auth_form_input"
                name="login"
                id="login"
                value={data.login}
                onChange={(e) => {
                  setData({ ...data, login: e.target.value })
                }}
                required
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
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value })
                }}
                required
              />
            </div>
            <button type="submit" className="auth_form_button">
              Зареєструватись
            </button>
            <Link to="/login" className="auth_form_link">
              Вже є аккаунт?
            </Link>
          </form>
        </div>
      </div>
      {!message ? null : <ErrorMessage message={message} status={respStatus} />}
    </>
  )
}

export default RegistrationPage
