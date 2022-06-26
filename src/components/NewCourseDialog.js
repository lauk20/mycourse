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

const NewCourseDialog = ()=> {
  return (
    <Dialog open={true}>
      <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Add New Course</DialogTitle>
      <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <DialogContentText sx={{mb: 2}}>Add a new course to your current list of courses</DialogContentText>
        <WhiteBorderTextField autofocus id="name" label="Course Name" fullWidth sx={{input: {color: "white"}}}/>
      </DialogContent>
      <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <Button sx={{color: "white"}}>Cancel</Button>
        <Button sx={{color: "white"}}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewCourseDialog
