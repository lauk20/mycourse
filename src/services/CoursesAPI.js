import axios from "axios"
import { useSelector } from "react-redux"

const url = "http://localhost:3001/api/courses"

let userToken = null;
const currentsession = window.localStorage.getItem("mycoursetoken");
if (currentsession) {
  userToken = "bearer " + JSON.parse(currentsession).token
}

const authHeader = {
  headers: { Authorization: userToken },
}

const getCourses = async () => {
  const response = await axios.get(url, authHeader);

  return response.data
}

const addCourse = async (courseTitle) => {
  const course = {
    name: courseTitle,
    assignments: []
  }
  const response = await axios.post(url, course, authHeader);

  return response.data
}

const services = { getCourses, addCourse }

export default services
