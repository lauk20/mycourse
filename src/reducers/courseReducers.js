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
    removeAssignment(state, action) {
      const newState = state.map(course => {
        if (course._id === action.payload.course) {
          const assigns = course.assignments.filter(a => a._id !== action.payload)
          return {...course, assignments: assigns}
        }

        return course
      })

      return newState
    },
    setTitle(state, action) {
      const newState = state.map(course => {
        if (course._id === action.payload.course) {
          return {...course, name: action.payload.name}
        }

        return course
      })

      return newState
    },
    removeCourse(state, action) {
      const newState = state.filter(course => course._id == action.payload);

      return newState;
    },
  }
})

export const initializeCourses = (token) => {
  return async dispatch => {
    const courses = await courseAPI.getCourses(token)
    dispatch(setCourses(courses))
  }
}

export const createCourse = (title, token) => {
  return async dispatch => {
    const course = await courseAPI.addCourse(title, token)
    dispatch(addCourse(course))
  }
}

export const getCourse = async (courseID, token) => {
  const course = await courseAPI.getCourse(courseID, token);

  return course;
}

export const setCourseTitle = (courseID, name, token) => {
  return async dispatch => {
    await courseAPI.setCourseTitle(courseID, name, token);
    dispatch(setTitle({ course: courseID, name }));
  }
}

export const deleteCourse = (courseID, token) => {
  return async dispatch => {
    await courseAPI.deleteCourse(courseID, token);
    dispatch(removeCourse(courseID));
  }
}

export const { addCourse, setCourses, newAssignment, removeAssignment, setTitle, removeCourse } = courseSlice.actions
export default courseSlice.reducer
