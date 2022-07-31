import {
  Grid,
  Typography,
  Box,
  Button,
  Toolbar,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const Landing = ({userToken}) => {
  const navigate = useNavigate();

  if (userToken != null) {
    navigate("/courses");
  }

  return (
    <>
      <Toolbar/>
      <Box sx={{height:"75vh"}}>
        <Grid container sx={{p: 5, height: "100%"}} spacing={1} display="flex" justifyContent="center" flexDirection="column">
          <Grid item display="flex" justifyContent="center">
            <Typography variant="h1" spacing={1} sx={{mr: 1, letterSpacing:"0.3rem", fontWeight: 60}}>MYCOURSE</Typography>
          </Grid>
          <Grid item display="flex" justifyContent="center">
            <Typography variant="h6" spacing={1} sx={{mr: 1, letterSpacing:"0.3rem", fontWeight: 60, textAlign: "center"}}>YOUR PERSONAL COURSEWORK MANAGEMENT TOOL</Typography>
          </Grid>
          <Grid item display="flex" justifyContent="center" sx={{mt: 5}}>
            <Button component={Link} to="/signup" sx={{fontSize: 25, color: "white", backgroundColor: "rgb(35, 35, 35)", fontWeight: 60}}>GET STARTED</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Landing
