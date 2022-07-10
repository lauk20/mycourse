import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import CoursePage from "./pages/CoursePage"
import Login from "./pages/Login"
import AddCourse from "./pages/AddCourse"
import Signup from "./pages/Signup"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setLogin } from "./reducers/loginReducers"

function App() {
  const [openCourseDialog, setOpenCourseDialog] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentsession = window.localStorage.getItem("mycoursetoken");
    if (currentsession) {
      const userToken = JSON.parse(currentsession)
      dispatch(setLogin(userToken))
    }
  }, [])

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
            <Route path ="/courses/:id" element={userToken == null ? <Login/> : <CoursePage/>}/>
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route path="/courses" element={userToken == null ? <Login/> : <Courses openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
