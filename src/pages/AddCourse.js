import { React, useState } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

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

const AddCourse = () => {
  const [name, setName] = useState("");
  const nameChange = (event) => {
    setName(event.target.value)
  }

  return (
    <Box component="form" display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="85vh">
      <Typography variant="h2" sx={{color: "white"}}>Add a New Course</Typography>
      <FormControl sx={{width:"50vw", m: 5}}>
        <WhiteBorderTextField id="title" label="Course Name" variant="outlined" value={name} onChange={nameChange} sx={{input: {color: "white"}}}/>
      </FormControl>
      <Box>
        <Button variant="outlined" sx={{color: "white", borderColor: "white", '&:hover': {borderColor: "white"}}} size="large" endIcon={<AddIcon/>}>Add</Button>
      </Box>
    </Box>
  )
}

export default AddCourse
