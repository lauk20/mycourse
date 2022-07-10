import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./reducers/courseReducers"
import assignmentReducer from "./reducers/assignmentReducers"
import loginReducer from "./reducers/loginReducers"

const store = configureStore({
  reducer: {
    courses: courseReducer,
    assignments: assignmentReducer,
    login: loginReducer
  }
})

export default store
