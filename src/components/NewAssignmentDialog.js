import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCourse } from "../reducers/courseReducers"
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

const popperstyles = {
  "& .MuiPaper-root": {
    backgroundColor: "#0e0e0e",
    color: "white",
  },
  "& .MuiPickersArrowSwitcher-button": {
    color: "white",
  },
  "& .MuiIconButton-root": {
    color: "white"
  },
  "& .MuiPickersDay-dayWithMargin": {
    color: "white",
    backgroundColor: "black",
  },
  "& .MuiPickersDay-dayWithMargin:hover": {
    color: "white",
    backgroundColor: "rgb(35, 35, 35)",
  },
  "& .css-1flhz3h": {
    color: "white"
  },
  "& .css-qrabyo": {
    backgroundColor: "white"
  },
  "& .css-vq8oi5": {
    border: "16px solid",
    borderColor: "rgb(35, 35, 35)"
  },
  "& .css-6hrdyi": {
    backgroundColor: "white"
  },
}

const NewAssignmentDialog = ({openNewAssignDialog, setOpenNewAssignDialog})=> {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch()
  const newCourse = async (event) => {
    if (name !== "") {
      console.log(name)
      dispatch(createCourse(name))
      setOpenNewAssignDialog(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={openNewAssignDialog}>
        <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Add New Assignment</DialogTitle>
        <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
          <DialogContentText sx={{mb: 2}}>Add a new assignment to your this course</DialogContentText>
          <Stack spacing={3}>
            <WhiteBorderTextField autoFocus id="name" label="Assignment Name" fullWidth value={name} onChange={(event) => {setName(event.target.value)}} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>
            <DateTimePicker label="Assignment Due Date and Time" value={date} onChange={setDate} PopperProps={{sx:popperstyles}} sx={{input: {color: "white"}}}
              renderInput={(params) =>
                <WhiteBorderTextField {...params} sx={{svg: {color:"white"}, label: {color: "white"}, input: {color: "white"}}}/>}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
          <Button sx={{color: "white"}} onClick={() => {setOpenNewAssignDialog(false)}}>Cancel</Button>
          <Button sx={{color: "white"}} onClick={newCourse}>Add</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default NewAssignmentDialog
