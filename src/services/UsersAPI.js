import axios from "axios"
const loginUrl = "/api/login"
const usersUrl = "/api/users"

const login = async (username, password) => {
  const response = await axios.post(loginUrl, {username, password})

  return response.data
}

const signup = async (username, password) => {
  const response = await axios.post(usersUrl, {username, password})

  return response.data
}

const services = { login, signup }
export default services
