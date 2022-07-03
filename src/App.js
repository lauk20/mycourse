import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import CoursePage from "./pages/CoursePage"
import Login from "./pages/Login"
import AddCourse from "./pages/AddCourse"
import { useState } from "react"

function App() {
  const [openCourseDialog, setOpenCourseDialog] = useState(false)

  return (
    <>
      <CssBaseline/>
      <div className="App">
        <Router>
          <Nav setOpenCourseDialog={setOpenCourseDialog}/>
          <Routes>
            <Route path ="/courses/:id" element={<CoursePage/>}/>
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
