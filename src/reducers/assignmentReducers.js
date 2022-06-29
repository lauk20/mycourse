import { createSlice } from "@reduxjs/toolkit"
import assignmentAPI from "../services/AssignmentsAPI"
import { newAssignment } from "./courseReducers"

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    addAssignment(state, action) {
      const course = state.courses.find(course => course._id === action.payload.courseID);

      if (course === undefined){
        return undefined
      }

      newAssignment(action.payload);
    }
  }
})

export const createAssignment = (name, date, courseID) => {
  return async dispatch => {
    const assignment = await assignmentAPI.addAssignment(name, date, courseID);
    dispatch(addAssignment(assignment))
  }
}

export const { addAssignment } = assignmentSlice.actions
export default assignmentSlice.reducer
