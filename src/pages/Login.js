import {
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button
} from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import { styled } from "@mui/material/styles"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../reducers/loginReducers"
import { useDispatch } from "react-redux"

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

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault();

    try {
      const userToken = await dispatch(login(username, password))
      window.localStorage.setItem("mycoursetoken", JSON.stringify(userToken))
      setUsername("")
      setPassword("")
      navigate("/courses")
    } catch {
      console.log("error")
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{height: "75vh"}}>
      <Grid container sx={{backgroundColor: "rgb(35, 35, 35)", display: "flex", flexDirection: "column", alignItems: "center", width: "60%", maxWidth: 500, p: 2}}>
        <Grid item sx={{display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center"}}>
          <Avatar sx={{color: "white", width: "50", height: "50", bgcolor: "rgb(25, 25, 25)"}}>
            <LoginIcon variant="large" sx={{fontSize: 30}}/>
          </Avatar>
          <Typography color="white" variant="h6">LOGIN</Typography>
        </Grid>
        <Box component="form" noValidate onSubmit={submit}>
          <WhiteBorderTextField value={username} onChange={({target}) => {setUsername(target.value)}} fullWidth required margin="normal" name="username" label="Username" id="username" sx={{input: {color: "white"}}} autoFocus/>
          <WhiteBorderTextField value={password} onChange={({target}) => {setPassword(target.value)}} fullWidth required margin="normal" name="password" label="Password" id="password" type="password" sx={{input: {color: "white"}}}/>
          <Button type="submit" fullWidth sx={{color: "white", backgroundColor: "rgb(25, 25, 25)", "&:hover": {bgcolor: "rgb(25, 25, 25)"}}}>Login</Button>
          <Button component={ Link } to="/signup" sx={{mt: 2, color: "white"}}>Sign Up</Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default Login
