import "./style.css"
import { ReactComponent as Logo } from "../../img/logo.svg"
import { ReactComponent as SoloRoom } from "../../img/solo-room.svg"
import { ReactComponent as MultiRoom } from "../../img/multi-room.svg"
import { ReactComponent as Profile } from "../../img/profile.svg"
import { ReactComponent as Rating } from "../../img/rating.svg"
import { ReactComponent as Logout } from "../../img/logout.svg"
import { ReactComponent as Add } from "../../img/add.svg"
import authService from "../../services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
const Menu = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const role = useSelector((state) => state.user.role)
  const logoutHandler = async () => {
    await authService.logout()
    dispatch({ type: "RESET_AUTH" })
    return navigate("/")
  }
  return (
    <div className="menu">
      <div className="menu_top_block">
        <Logo />
      </div>
      <nav className="menu_nav">
        <ul className="menu_list">
          <li className="menu_list_item">
            <Link to="/rooms" className="menu_list_item_link">
              <MultiRoom />
            </Link>
          </li>
          {/* <li className="menu_list_item">
            <Link to="/room" className="menu_list_item_link">
              <SoloRoom />
            </Link>
          </li> */}
          <li className="menu_list_item">
            <Link to="/rating" className="menu_list_item_link">
              <Rating />
            </Link>
          </li>
          {/* <li className="menu_list_item">
            <Link to="/profile" className="menu_list_item_link">
              <Profile />
            </Link>
          </li> */}
          {role == "admin" ? (
            <li className="menu_list_item">
              <Link to="/tasks" className="menu_list_item_link">
                <Add />
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <div className="menu_bottom_block">
        <button className="logout_btn" onClick={logoutHandler}>
          <Logout />
        </button>
      </div>
    </div>
  )
}

export default Menu
