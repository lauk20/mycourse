import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createAssignment } from "../reducers/assignmentReducers"
import { newAssignment } from "../reducers/courseReducers"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: white;
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
`;

const NewAssignmentDialog = ({openNewAssignDialog, setOpenNewAssignDialog, courseID, course})=> {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());

  const token = useSelector(state => {
    const login = state.login

    return login.token
  })

  const dispatch = useDispatch()
  const addnewAssignment = async (event) => {
    if (name !== "" && openNewAssignDialog) {
      setOpenNewAssignDialog(false)
      console.log(name, courseID)
      const assignment = await dispatch(createAssignment(name, date, courseID, details, token))
      console.log(assignment)
      //dispatch(newAssignment({content: name, due: date.toString(), course: courseID}))
      dispatch(newAssignment(assignment))
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={openNewAssignDialog}>
        <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Add New Assignment</DialogTitle>
        <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
          <DialogContentText sx={{mb: 2}}>Add a new assignment to this course: {course}</DialogContentText>
          <Stack spacing={3}>
            <WhiteBorderTextField autoFocus InputLabelProps={{ shrink: true }} id="name" label="Assignment Name" fullWidth value={name} onChange={(event) => {setName(event.target.value)}} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>
            <WhiteBorderTextField multiline rows={3} InputLabelProps={{ shrink: true }} id="details" label="Assignment Details" fullWidth value={details} onChange={(event) => {setDetails(event.target.value)}} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>
            <DatePicker label="Assignment Due Date" value={date} onChange={setDate} sx={{input: {color: "white"}}}
              renderInput={(params) =>
                <WhiteBorderTextField {...params} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>}
            />
            <TimePicker label="Due Time" value={date} onChange={setDate}
              renderInput={(params) =>
                <WhiteBorderTextField {...params} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
          <Button sx={{color: "white"}} onClick={() => {setOpenNewAssignDialog(false)}}>Cancel</Button>
          <Button sx={{color: "white"}} onClick={addnewAssignment}>Add</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default NewAssignmentDialog
