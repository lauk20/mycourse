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

const updateDetails = async (assignID, details) => {
  const response = await axios.put(url + "/" + assignID.toString(), { details: details });

  return response.data
}

const services = { getAssignments, addAssignment, updateDetails }

export default services
