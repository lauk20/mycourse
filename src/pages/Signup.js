import {
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Toolbar,
} from "@mui/material"
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { styled } from "@mui/material/styles"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UsersAPI from "../services/UsersAPI"

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

const Signup = ({userToken}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");

  //const [usernameErr, setUsernameErr] = useState(false)
  //const [usernameHelpText, setUsernameHelpText] = useState("Must be 3-20 characters long and only contain letters and numbers.");
  const [signupHelpText, setSignupHelpText] = useState("");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  if (userToken != null) {
    navigate("/courses")
  }

  const request = async () => {
    if (password !== confirmPassword) {
      setLoading(false);
      return setSignupHelpText("Passwords do not match")
    }

    try {
      setLoading(true)
      await UsersAPI.signup(username, password)
      setUsername("");
      setPassword("");
      navigate("/login")
    } catch (err) {
      if (err.response.data.error === "username already taken") {
        setSignupHelpText("Username already taken");
      } else if (err.response.data.error === "username does not meet requirements") {
        setSignupHelpText("Username does not meet requirements")
      } else if (err.response.data.error === "password does not meet requirements") {
        setSignupHelpText("Password does not meet requirements")
      }
      //console.log(err)
    }

    setLoading(false);
  }

  const submit = async () => {
    //event.preventDefault();
    setSignupHelpText("");
    setLoading(true)
    //https://stackoverflow.com/questions/46720685/catching-errors-with-axios
  }

  return (
    <>
    <Toolbar/>
    <Box display="flex" justifyContent="center" alignItems="center" sx={{height: "75vh"}}>
      <Grid container sx={{backgroundColor: "rgb(35, 35, 35)", display: "flex", flexDirection: "column", alignItems: "center", width: "60%", maxWidth: 500, minWidth: 325, p: 2}}>
        <Grid item sx={{display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center"}}>
          <Avatar sx={{color: "white", width: "50", height: "50", bgcolor: "rgb(25, 25, 25)"}}>
            <AssignmentIndIcon variant="large" sx={{fontSize: 30}}/>
          </Avatar>
          <Typography color="white" variant="h6">SIGN UP</Typography>
        </Grid>
        <Box component="form" noValidate onSubmit={(event) => {event.preventDefault(); submit(); if (!loading) {request()}}}>
          <WhiteBorderTextField error={false} value={username} helperText="Must be 3-20 characters long and only contain letters and numbers." onChange={({target}) => {setUsername(target.value)}} fullWidth required margin="normal" name="username" label="Username" id="username" sx={{input: {color: "white"}}} autoFocus/>
          <WhiteBorderTextField value={password} helperText="Must be 8-20 characters long" onChange={({target}) => {setPassword(target.value)}} fullWidth required margin="normal" name="password" label="Password" id="password" type="password" sx={{input: {color: "white"}}}/>
          <WhiteBorderTextField value={confirmPassword} helperText="Retype your password" onChange={({target}) => {setConfirmPassword(target.value)}} fullWidth required margin="normal" name="confirmPassword" label="Confirm Password" id="confirmPassword" type="password" sx={{input: {color: "white"}}}/>
          <Button type="submit" fullWidth sx={{color: "white", backgroundColor: "rgb(25, 25, 25)", "&:hover": {bgcolor: "rgb(25, 25, 25)"}, mt: 2}}>SIGN UP</Button>
          <Box>
            <Typography variant="caption" color="red">{signupHelpText}</Typography>
          </Box>
          <Box>
            {loading &&
              <LinearProgress/>
            }
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-start" width="100%" position="relative">
          <Button component={ Link } to="/login" sx={{mt: 2, color: "white"}}>Login</Button>
        </Box>
      </Grid>
    </Box>
    </>
  )
}

export default Signup
