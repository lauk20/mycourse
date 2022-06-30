import { createSlice } from "@reduxjs/toolkit"
import assignmentAPI from "../services/AssignmentsAPI"

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    addAssignment(state, action) {
      state.push(action.payload);
    }
  }
})

export const createAssignment = (name, date, courseID) => {
  return async dispatch => {
    const assignment = await assignmentAPI.addAssignment(name, date, courseID);
    dispatch(addAssignment(assignment))

    return assignment;
  }
}

export const { addAssignment } = assignmentSlice.actions
export default assignmentSlice.reducer
