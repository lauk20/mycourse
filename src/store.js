import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./reducers/courseReducers"

const store = configureStore({
  reducer: {
    courses: courseReducer
  }
})

export default store
