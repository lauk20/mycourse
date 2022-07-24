import axios from "axios"

const url = "http://localhost:3001/api/courses"

let userToken = null;
let authHeader = null;

const setToken = async (token) => {
  userToken = "bearer " + token
  authHeader = {
    headers: { Authorization: userToken }
  }
}

const getCourses = async (token) => {
  authHeader = {
    headers: { Authorization: "bearer " + token }
  }
  const response = await axios.get(url, authHeader);
  console.log(response)
  return response.data
}

const getCourse = async (id, token) => {
  authHeader = {
    headers: { Authorization: "bearer " + token }
  }
  const response = await axios.get(url + "/" + id.toString(), authHeader);

  return response.data
}

const addCourse = async (courseTitle, token) => {
  authHeader = {
    headers: { Authorization: "bearer " + token }
  }
  const course = {
    name: courseTitle,
    assignments: []
  }
  const response = await axios.post(url, course, authHeader);

  return response.data
}

const setCourseTitle = async (id, name, token) => {
  authHeader = {
    headers: { Authorization: "bearer " + token }
  }

  const response = await axios.put(url + "/" + id.toString(), {name}, authHeader);

  return response.data
}

const deleteCourse = async (id, token) => {
  authHeader = {
    headers: { Authorization: "bearer " + token }
  }

  const response = await axios.delete(url + "/" + id.toString(), authHeader);

  return response.data
}

const services = { getCourses, getCourse, addCourse, setToken, setCourseTitle, deleteCourse }

export default services
