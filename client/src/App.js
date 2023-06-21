import "./App.css"
import React from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import AuthService from "./services/auth.service"
import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import RoomsPage from "./pages/RoomsPage"
import RoomPage from "./pages/RoomPage"
import TasksPage from "./pages/TasksPage"
import TaskPage from "./pages/TaskPage"
import RatingPage from "./pages/RatingPage"
import ProfilePage from "./pages/ProfilePage"
function App() {
  const isAuth = useSelector((state) => state.user.auth)
  const role = useSelector((state) => state.user.role)
  const [loadUserData, setLoadUserData] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    const refresh = async () => {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== "undefined"
      ) {
        const userData = await AuthService.refresh()
        if (userData) {
          if ("data" in userData) {
            if (userData.data.user) {
              dispatch({ type: "SET_AUTH", payload: true })
              dispatch({ type: "SET_USER", payload: userData.data.user })
            }
          }
        }
      }
      setLoadUserData(false)
    }
    refresh()
  }, [])
  let roomId = localStorage.getItem("roomId")
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<WelcomePage />} />,
      <Route
        path="/login"
        element={!isAuth ? <LoginPage /> : <Navigate to="/rooms" />}
      />,
      <Route path="/registration" element={<RegistrationPage />} />,
      <Route
        path="/rooms"
        element={
          roomId && isAuth ? (
            <Navigate to={"/room/" + roomId} />
          ) : isAuth ? (
            <RoomsPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />,
      <Route
        path="/rating"
        element={
          roomId && isAuth ? (
            <Navigate to={"/room/" + roomId} />
          ) : isAuth ? (
            <RatingPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />,
      // <Route
      //   path="/profile"
      //   element={
      //     roomId && isAuth ? (
      //       <Navigate to={"/room/" + roomId} />
      //     ) : isAuth ? (
      //       <ProfilePage />
      //     ) : (
      //       <Navigate to="/login" />
      //     )
      //   }
      // />,
      <Route
        path="/room/:id"
        element={isAuth ? <RoomPage /> : <Navigate to="/login" />}
      />,
      <Route
        path="/tasks"
        element={
          roomId && isAuth ? (
            <Navigate to={"/room/" + roomId} />
          ) : isAuth && role == "admin" ? (
            <TasksPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />,
      <Route
        path="/task/:id"
        element={
          roomId && isAuth ? (
            <Navigate to={"/room/" + roomId} />
          ) : isAuth && role == "admin" ? (
            <TaskPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />,
    ])
  )
  return (
    <div className="App">
      {!loadUserData && <RouterProvider router={router} />}
    </div>
  )
}

export default App
