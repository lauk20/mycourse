import { createSlice } from "@reduxjs/toolkit"
import UsersAPI from "../services/UsersAPI"
import authInstance from "../services/interceptors"

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    removeLogin(state, action) {
      return null;
    }
  }
})

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await UsersAPI.login(username, password);
    if (response) {
      dispatch(setLogin(response))
    }

    return response;
  }
}

export const refreshTokenLogin = () => {
  return async (dispatch) => {
    try {
      const response = await authInstance.get("http://localhost:3001/api/refresh");
      if (response) {
        dispatch(setLogin(response.data));
      }
    } catch (err) {
      return err;
    }
  }
}

export const logoutSession = () => {
  return async (dispatch) => {
    try {
      const response = await authInstance.get("http://localhost:3001/api/logout");
      if (response) {
        dispatch(removeLogin())
      }
    } catch (err) {
      return err;
    }
  }
}

export const { setLogin, removeLogin } = loginSlice.actions
export default loginSlice.reducer
