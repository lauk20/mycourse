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
import { Link } from "react-router-dom"

const NavBar = ({setOpenCourseDialog}) => {
  const openDialog = () => {
    setOpenCourseDialog(true);
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
            <Box>
              <MenuItem sx={{borderRadius:"8px"}} component={ Link } to="/courses">
                <Typography>
                    COURSES
                </Typography>
              </MenuItem>
            </Box>
            <Box>
              <IconButton sx={{color:"white", mr:1}} size="large" onClick={openDialog}>
                <AddIcon/>
              </IconButton>
            </Box>
          </Grid>
          <Grid item display="flex" justifyContent="flex-start" alignItems="center">
            <Typography>NAME</Typography>
            <Box>
              <IconButton sx={{color:"white", mr:1}} size="large">
                <AccountCircleIcon/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  )
}

export default NavBar
