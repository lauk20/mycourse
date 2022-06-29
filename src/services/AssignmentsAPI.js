import axios from "axios"
const url = "http://localhost:3001/api/assignments"

const getAssignments = async () => {
  const response = await axios.get(url);

  return response.data
}

const addAssignment = async (contents, date, courseID) => {
  const assignment = {
    content: contents,
    due: date,
    course: courseID
  }
  const response = await axios.post(url, assignment);

  return response.data
}

const services = { getAssignments, addAssignment }

export default services
