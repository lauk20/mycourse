import { createSlice } from "@reduxjs/toolkit"
import assignmentAPI from "../services/AssignmentsAPI"

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    addAssignment(state, action) {
      state.push(action.payload);
    },
    setDetails(state, action) {
      const newState = state.map(assign => {
        if (assign._id === action.payload.id) {
          return {...assign, details: action.payload.details}
        }
      })

      return newState
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

export const updateDetails = (assignmentID, details) => {
  return async dispatch => {
    const assignment = await assignmentAPI.updateDetails(assignmentID, details);
    dispatch(setDetails({details, id: assignmentID}))

    return assignment;
  }
}

export const { addAssignment, setDetails } = assignmentSlice.actions
export default assignmentSlice.reducer
