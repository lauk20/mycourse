import axios from "./interceptors.js"
const url = "http://localhost:3001/api/assignments"

const getAssignments = async () => {
  const response = await axios.get(url);

  return response.data
}

const addAssignment = async (contents, date, courseID, details, token) => {
  const assignment = {
    content: contents,
    due: date,
    course: courseID,
    details: details
  }

  const response = await axios.post(url, assignment);

  return response.data
}

const updateDetails = async (assignID, details, token) => {
  const response = await axios.put(url + "/" + assignID.toString(), { details: details });

  return response.data
}

const updateAssignment = async (assignment, token) => {
  const response = await axios.put(url + "/" + assignment._id.toString(), assignment);

  return response.data
}

const completeAssignment = async (id, token) => {
  const response = await axios.delete(url + "/" + id.toString());

  return response.data
}

const services = { getAssignments, addAssignment, updateDetails, updateAssignment, completeAssignment }

export default services
