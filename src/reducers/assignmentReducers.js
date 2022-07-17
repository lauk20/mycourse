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

        return assign;
      })

      return newState
    },
    setAssignment(state, action){
      const newState = state.map(assign => {
        if (assign._id === action.payload._id) {
          assign.content = action.payload.content;
          assign.details = action.payload.details;
          assign.due = action.payload.due;
        }

        return assign;
      })

      return newState
    },
    setAssignments(state, action) {
      return action.payload
    }
  }
})

export const createAssignment = (name, date, courseID, details) => {
  return async dispatch => {
    const assignment = await assignmentAPI.addAssignment(name, date, courseID, details);
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

export const updateAssignment = (newAssignmentObj) => {
  return async dispatch => {
    const assignment = await assignmentAPI.updateAssignment(newAssignmentObj);
    dispatch(setAssignment(newAssignmentObj))

    return assignment;
  }
}

export const initializeAssignments = () => {
  return async dispatch => {
    const assignments = await assignmentAPI.getAssignments();
    dispatch(setAssignments(assignments))

    return assignments;
  }
}

export const { addAssignment, setDetails, setAssignment, setAssignments } = assignmentSlice.actions
export default assignmentSlice.reducer
