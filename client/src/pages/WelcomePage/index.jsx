import "./style.css"
import Logo from "../../img/logo.svg"
import { Link } from "react-router-dom"
import CodeBlock from "../../components/CodeBlock"
const WelcomePage = () => {
  return (
    <div className="welcome_page">
      <nav className="welcome_page_nav">
        <div className="logo_block">
          <img src={Logo} alt="" className="logo_img" />
          <h1 className="logo_text">Python CodeWarriors</h1>
        </div>
        <div className="buttons_block">
          <Link to="/registration" className="register_btn">
            Зареєструватись
          </Link>
          <Link to="/login" className="login_btn">
            Війти
          </Link>
        </div>
      </nav>
      <main className="main">
        <CodeBlock>
          {
            "def binary_search(arr, x):\n\tleft = 0\n\tright = len(arr) - 1\n\twhile left <= right:\n\t\tmid = (left + right) // 2\n\t\tif arr[mid] == x:\n\t\t\treturn mid\n\t\telif arr[mid] < x:\n\t\t\tleft = mid + 1\n\t\telse:\n\t\t\tright = mid - 1\n\treturn -1"
          }
        </CodeBlock>
        <div className="content_block">
          <h1 className="main_title">
            Випробуйте свої знання Python та змагайтесь з іншими користувачами!
          </h1>
          <p className="main_text">
            Ласкаво просимо до нашого веб-додатку для розв'язування задач на
            Python! Змагайтеся з іншими користувачами на швидкість та випробуйте
            свої знання програмування. Наш додаток містить велику кількість
            задач на різні теми, від початкового до високого рівня складності.
            Приєднуйтеся до нашої спільноти розв'язувачів задач на Python та
            допоможіть один одному вдосконалюватися у програмуванні!
          </p>
          <Link to="/registration" className="main_button">
            Приєднатись
          </Link>
        </div>
      </main>
    </div>
  )
}

export default WelcomePage
