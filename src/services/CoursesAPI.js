import axios from "axios"
import { useSelector } from "react-redux"

const url = "http://localhost:3001/api/courses"

let userToken = null;
let authHeader = null;

const setToken = async (token) => {
  userToken = "bearer " + token
  authHeader = {
    headers: { Authorization: userToken }
  }
}

const getCourses = async () => {
  console.log(userToken)
  const response = await axios.get(url, authHeader);
  console.log(response)
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

const services = { getCourses, addCourse, setToken }

export default services
