import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { styled } from "@mui/material/styles"

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

const NewCourseDialog = ({openCourseDialog, setOpenCourseDialog})=> {
  return (
    <Dialog open={openCourseDialog}>
      <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Add New Course</DialogTitle>
      <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <DialogContentText sx={{mb: 2}}>Add a new course to your current list of courses</DialogContentText>
        <WhiteBorderTextField autoFocus id="name" label="Course Name" fullWidth sx={{input: {color: "white"}}}/>
      </DialogContent>
      <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <Button sx={{color: "white"}} onClick={() => {setOpenCourseDialog(false)}}>Cancel</Button>
        <Button sx={{color: "white"}}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewCourseDialog
