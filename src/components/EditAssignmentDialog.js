import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateAssignment } from "../reducers/assignmentReducers"
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

const EditAssignmentDialog = ({openEditAssignDialog, setOpenEditAssignDialog, assignment, courseID})=> {
  /*
  const course = useSelector(state => {
    const courses = state.courses;

    for (var i = 0; i < courses.length; i++) {
      if (courses[i]._id === courseID) {
        return courses[i]
      }
    }
  })
  const assignment = course.assignments.find(assignment => assignment._id === assignmentID)
  */
  const [name, setName] = useState(assignment.content);
  const [details, setDetails] = useState(assignment.details || "");
  const [date, setDate] = useState(assignment.due);

  if (name !== assignment.content) {
    setName(assignment.content);
    setDetails(assignment.details);
    setDate(assignment.due)
  }

  console.log("render")
  const dispatch = useDispatch()
  const updateAssignmentOnClick = async () => {
    if (openEditAssignDialog) {
      setOpenEditAssignDialog(false)
      const assign = await dispatch(updateAssignment({content: name, details: details, due: date, _id: assignment._id}));
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={openEditAssignDialog}>
        <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Edit Assignment</DialogTitle>
        <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
          <DialogContentText sx={{mb: 2}}>Edit this assignment: {assignment.content}</DialogContentText>
          <Stack spacing={3}>
            <WhiteBorderTextField autoFocus id="name" label="Assignment Name" fullWidth value={name} onChange={(event) => {setName(event.target.value)}} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>
            <WhiteBorderTextField id="details" label="Assignment Details" fullWidth value={details} onChange={(event) => {setDetails(event.target.value)}} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>
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
          <Button sx={{color: "white"}} onClick={() => {setOpenEditAssignDialog(false)}}>Cancel</Button>
          <Button sx={{color: "white"}} onClick={() => updateAssignmentOnClick()}>Save</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default EditAssignmentDialog
