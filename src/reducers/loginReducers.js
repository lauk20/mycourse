import { createSlice } from "@reduxjs/toolkit"
import UsersAPI from "../services/UsersAPI"

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setLogin(state, action) {
      state = action
    }
  }
})

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await UsersAPI.login(username, password);

    if (user) {
      dispatch(setLogin(response))
    }

    return response;
  }
}

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer