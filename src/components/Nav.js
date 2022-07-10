import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  MenuItem,
  Grid,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
//https://stackoverflow.com/questions/70341850/react-redirect-to-login-page-when-not-authenticated

const NavBar = ({setOpenCourseDialog}) => {
  const openDialog = () => {
    setOpenCourseDialog(true);
  }

  const location = useLocation();
  const userToken = useSelector(state => {
    const login = state.login

    return login;
  })

  const userIcon = () => (
    <>
      <Typography>NAME</Typography>
      <Box>
        <IconButton sx={{color:"white", mr:1}} size="large">
          <AccountCircleIcon/>
        </IconButton>
      </Box>
    </>
  )

  const login = () => (
    <>
      <Box>
        <MenuItem sx={{borderRadius: "8px"}} component={ Link } to="/login">
          <Typography>LOGIN</Typography>
        </MenuItem>
      </Box>
    </>
  )

  const courses = () => {
    <Box>
      <MenuItem sx={{borderRadius:"8px"}} component={ Link } to="/courses">
        <Typography>
            COURSES
        </Typography>
      </MenuItem>
    </Box>
  }

  return (
    <>
    <AppBar color="primary">
      <Toolbar>
        <Grid container>
          <Grid item>
            <IconButton sx={{color:"white", mr:1}} size="large">
              <MenuIcon/>
            </IconButton>
          </Grid>
          <Grid item display="flex" justifyContent="flex-start" alignItems="center">
            <Typography variant="h6" sx={{mr: 1, letterSpacing:"0.3rem"}}>
              MYCOURSE
            </Typography>
          </Grid>
          <Grid item xs display="flex" justifyContent="flex-start" alignItems="center">
            {userToken != null && courses()}
            {location.pathname === "/courses" && userToken != null &&
              <Box>
                <IconButton sx={{color:"white", mr:1}} size="large" onClick={openDialog}>
                  <AddIcon/>
                </IconButton>
              </Box>
            }
          </Grid>
          <Grid item display="flex" justifyContent="flex-start" alignItems="center">
            {userToken != null ?
              userIcon() :
              login()
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  )
}

export default NavBar
