import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./components/Nav"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Courses from "./pages/Courses"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <CssBaseline/>
      <div className="App">
        <Router>
          <Nav/>
          <Routes>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
