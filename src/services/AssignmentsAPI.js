import axios from "axios"
const url = "http://localhost:3001/api/assignments"

const getAssignments = async () => {
  const response = await axios.get(url);

  return response.data
}

const addAssignment = async (contents, date, courseID, details) => {
  const assignment = {
    content: contents,
    due: date,
    course: courseID,
    details: details
  }
  const response = await axios.post(url, assignment);

  return response.data
}

const updateDetails = async (assignID, details) => {
  const response = await axios.put(url + "/" + assignID.toString(), { details: details });

  return response.data
}

const updateAssignment = async (assignment) => {
  console.log(assignment)
  const response = await axios.put(url + "/" + assignment._id.toString(), assignment);

  return response.data
}

const services = { getAssignments, addAssignment, updateDetails, updateAssignment }

export default services
