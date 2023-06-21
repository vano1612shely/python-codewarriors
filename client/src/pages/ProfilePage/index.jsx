import { useSelector } from "react-redux"
import MainContainer from "../../components/MainContainer"
import Menu from "../../components/menu"
import "./style.css"
import { useState, useEffect } from "react"
import UsersService from "../../services/users.service"
import ProgressBar from "../../components/progressBar"
const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const id = useSelector((state) => state.user.id)
  useEffect(() => {
    const getData = async () => {
      const response = await UsersService.getUser(id)
      if (response && response.data) {
        console.log(response.data)
        setUserData(response.data)
      }
    }
    getData()
  }, [])
  return (
    <>
      <Menu />
      {userData ? (
        <MainContainer>
          <h1 className="player_profile_name">{userData.login}</h1>
          <h2 className="player_profile_role">{userData.role}</h2>
          <div className="player_profile_stats_block">
            <p className="player_profile_stats_points">{userData.points}</p>
            <p className="player_profile_stats_fights">{userData.fights}</p>
            <p className="player_profile_stats_wins">{userData.wins}</p>
            <ProgressBar
              bgcolor="#136dbb"
              completed={
                userData.fights > 0
                  ? (userData.wins / userData.fights) * 100
                  : 0
              }
            />
          </div>
        </MainContainer>
      ) : (
        ""
      )}
    </>
  )
}

export default ProfilePage
