import axios from "./interceptors.js"
const url = "http://localhost:3001/api/assignments"

const getAssignments = async () => {
  const response = await axios.get(url);

  return response.data
}

const addAssignment = async (contents, date, courseID, details, token) => {
  const authHeader = {
    headers: { Authorization: "bearer " + token }
  }

  const assignment = {
    content: contents,
    due: date,
    course: courseID,
    details: details
  }
  const response = await axios.post(url, assignment, authHeader);

  return response.data
}

const updateDetails = async (assignID, details, token) => {
  const authHeader = {
    headers: { Authorization: "bearer " + token }
  }

  const response = await axios.put(url + "/" + assignID.toString(), { details: details }, authHeader);

  return response.data
}

const updateAssignment = async (assignment, token) => {
  const authHeader = {
    headers: { Authorization: "bearer " + token }
  }
  console.log(assignment)
  const response = await axios.put(url + "/" + assignment._id.toString(), assignment, authHeader);

  return response.data
}

const completeAssignment = async (id, token) => {
  const authHeader = {
    headers: { Authorization: "bearer " + token }
  }
  const response = await axios.delete(url + "/" + id.toString(), authHeader);

  return response.data
}

const services = { getAssignments, addAssignment, updateDetails, updateAssignment, completeAssignment }

export default services
