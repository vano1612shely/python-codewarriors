import "./style.css"
import Menu from "../../components/menu"
import MainContainer from "../../components/MainContainer"
import CreateRoom from "../../components/createRoom"
import JoinRoom from "../../components/joinRoom"
const RoomsPage = () => {
  return (
    <>
      <Menu />
      <MainContainer>
        <div className="rooms_page_wrapper">
          <JoinRoom />
          <CreateRoom />
        </div>
      </MainContainer>
    </>
  )
}

export default RoomsPage
