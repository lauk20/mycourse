import { createSlice } from "@reduxjs/toolkit"
import UsersAPI from "../services/UsersAPI"

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

export const { setLogin, removeLogin } = loginSlice.actions
export default loginSlice.reducer
