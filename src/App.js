import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import Login from "./pages/Login"
import AddCourse from "./pages/AddCourse"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { initializeCourses } from "./reducers/courseReducers"

function App() {
  const [openCourseDialog, setOpenCourseDialog] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeCourses())
  })

  return (
    <>
      <CssBaseline/>
      <div className="App">
        <Router>
          <Nav setOpenCourseDialog={setOpenCourseDialog}/>
          <Routes>
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route path="/courses" element={<Courses openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
