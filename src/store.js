import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./reducers/courseReducers"

const store = configureStore({
  reducer: {
    notes: courseReducer
  }
})

export default store
