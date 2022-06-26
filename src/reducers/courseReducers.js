import { createSlice } from "@reduxjs/toolkit"
import courseAPI from "../services/CoursesAPI"

const courseSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addCourse(state, action) {
      state.push(action.payload)
    },
    setCourses(state, action) {
      return action.payload
    }
  }
})

export const initializeCourses = () => {
  return async dispatch => {
    const courses = await courseAPI.getCourses()
    dispatch(setCourses(courses))
  }
}

export const createCourse = title => {
  return async dispatch => {
    const course = await courseAPI.addCourse(title)
    dispatch(addCourse(course))
  }
}

export const { addCourse, setCourses } = courseSlice.actions
export default courseSlice.reducer
