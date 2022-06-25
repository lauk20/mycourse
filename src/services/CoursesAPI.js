import axios from "axios"
const url = "http://localhost:3001/api/courses"

const getCourses = async () => {
  const response = await axios.get(url);

  return response.data
}

const addCourse = async (course) => {
  const response = await axios.post(url, course);

  return response.data
}

const services = { getCourses, addCourse }

export default services
