import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./reducers/courseReducers"
import assignmentReducer from "./reducers/assignmentReducers"

const store = configureStore({
  reducer: {
    courses: courseReducer,
    assignments: assignmentReducer
  }
})

export default store
