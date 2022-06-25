import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <>
    <AppBar color="primary">
      <Toolbar>
        <IconButton sx={{color:"white", mr:1}} size="large">
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" sx={{mr: 1, letterSpacing:"0.3rem"}}>
          MYCOURSE
        </Typography>
        <Box>
          <MenuItem sx={{borderRadius:"8px"}} component={ Link } to="/courses">
            <Typography>
                COURSES
            </Typography>
          </MenuItem>
        </Box>
        <Box>
          <IconButton sx={{color:"white", mr:1}} size="large">
            <AddIcon/>
          </IconButton>
        </Box>
        <Box sx={{flexGrow:1}}/>
        <Typography>NAME</Typography>
        <Box>
          <IconButton sx={{color:"white", mr:1}} size="large">
            <AccountCircleIcon/>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    </>
  )
}

export default NavBar
