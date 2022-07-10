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
    },
    newAssignment(state, action) {
      const newState = state.map(course => {
        if (course._id === action.payload.course) {
          console.log(course.assignments)
          return {...course, assignments: [...course.assignments, action.payload]}
        }

        return course
      })

      return newState
      /*
      const assign = action.payload;
      console.log(assign)
      console.log(state)
      const newAssign = assign.map(({due, ...others}) => others)
      const newState = state.map(course => {
        if (course._id === action.payload.courseID) {
          return {...course, assignments: [...course.assignments, newAssign]}
        }

        return course
      })

      return newState
      */
    },
  }
})

export const initializeCourses = (token) => {
  return async dispatch => {
    const courses = await courseAPI.getCourses(token)
    dispatch(setCourses(courses))
  }
}

export const createCourse = title => {
  return async dispatch => {
    const course = await courseAPI.addCourse(title)
    dispatch(addCourse(course))
  }
}

export const { addCourse, setCourses, newAssignment } = courseSlice.actions
export default courseSlice.reducer
