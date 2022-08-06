import axios from "./interceptors.js"

const url = "http://localhost:3001/api/courses"

const getCourses = async (token) => {
  const response = await axios.get(url);
  console.log(response)
  return response.data
}

const getCourse = async (id, token) => {
  const response = await axios.get(url + "/" + id.toString());

  return response.data
}

const addCourse = async (courseTitle, token) => {
  const course = {
    name: courseTitle,
    assignments: []
  }
  const response = await axios.post(url, course);

  return response.data
}

const setCourseTitle = async (id, name, token) => {
  const response = await axios.put(url + "/" + id.toString(), {name});

  return response.data
}

const deleteCourse = async (id, token) => {
  const response = await axios.delete(url + "/" + id.toString());

  return response.data
}

const services = { getCourses, getCourse, addCourse, setCourseTitle, deleteCourse }

export default services
