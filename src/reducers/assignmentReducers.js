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
          return action.payload
        }

        return assign;
      })

      return newState
    },
    setAssignments(state, action) {
      return action.payload
    },
    removeAssignment(state, action) {
      state = state.filter(assign => assign._id !== action.payload)
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

export const completeAssignment = (id) => {
  return async dispatch => {
    await assignmentAPI.completeAssignment(id);
    dispatch(removeAssignment(id))
  }
}

export const { addAssignment, setDetails, setAssignment, setAssignments, removeAssignment } = assignmentSlice.actions
export default assignmentSlice.reducer
