import axios from "axios"
const loginUrl = "http://localhost:3001/api/login"
const usersUrl = "http://localhost:3001/api/users"
axios.defaults.withCredentials = true;

const login = async (username, password) => {
  const response = await axios.post(loginUrl, {username, password}, {withCredentials: true})

  return response.data
}

const signup = async (username, password) => {
  const response = await axios.post(usersUrl, {username, password})

  return response.data
}

const services = { login, signup }
export default services
