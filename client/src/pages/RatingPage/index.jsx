import "./style.css"
import Menu from "../../components/menu"
import MainContainer from "../../components/MainContainer"
import { useState, useEffect } from "react"
import UsersService from "../../services/users.service"
const RatingPage = () => {
  const [usersList, setUsersList] = useState([])
  const top2Colors = ["gold", "silver"]
  useEffect(() => {
    const getData = async () => {
      const response = await UsersService.getTop10()
      setUsersList(response.data)
      console.log(response.data)
    }
    getData()
  }, [])
  return (
    <>
      <Menu />
      <MainContainer>
        <div className="rating_block">
          <h1 className="rating_block_title">Топ-10 найкращих гравців</h1>
          <ul className="rating_list">
            {usersList.map((user, index) => {
              let style = {}
              if (index <= 1) {
                style = {
                  background: top2Colors[index],
                }
              }
              return (
                <li className="rating_list_item" key={index} style={style}>
                  <span className="rating_list_item_name">{user.login}</span>
                  <span className="rating_list_item_points">{user.points}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </MainContainer>
    </>
  )
}

export default RatingPage
