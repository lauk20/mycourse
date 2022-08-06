import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import CoursePage from "./pages/CoursePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Landing from "./pages/Landing"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLogin, refreshTokenLogin } from "./reducers/loginReducers"
import authInstance from "./services/interceptors"

function App() {
  const [openCourseDialog, setOpenCourseDialog] = useState(false)
  const dispatch = useDispatch()

  //window.localStorage.removeItem("mycoursetoken")
  useEffect(() => {
    dispatch(refreshTokenLogin());
  }, [dispatch])

  const userToken = useSelector(state => {
    const login = state.login
    return login;
  })

  return (
    <>
      <CssBaseline/>
      <div className="App">
        <Router>
          <Nav setOpenCourseDialog={setOpenCourseDialog}/>
          <Routes>
            <Route path="/" element={<Landing userToken={userToken}/>}/>
            <Route path ="/courses/:id" element={userToken == null ? <Login/> : <CoursePage/>}/>
            <Route path="/courses" element={userToken == null ? <Login/> : <Courses openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>}/>
            <Route path="/login" element={<Login userToken={userToken}/>}/>
            <Route path="/signup" element={<Signup userToken={userToken}/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
