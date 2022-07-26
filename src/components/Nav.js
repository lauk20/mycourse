import { React, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  MenuItem,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const NavBar = ({setOpenCourseDialog}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <Typography>{userToken.username}</Typography>
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

  return (
    <>
    <AppBar color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Grid container wrap="nowrap" overflow="auto">
          <Grid item>
            <IconButton onClick={() => {setDrawerOpen(!drawerOpen)}}sx={{color:"white", mr:1}} size="large">
              <MenuIcon/>
            </IconButton>
          </Grid>
          <Grid item display="flex" justifyContent="flex-start" alignItems="center">
            <Typography variant="h6" sx={{mr: 1, letterSpacing:"0.3rem"}}>
              MYCOURSE
            </Typography>
          </Grid>
          <Grid item display="flex" justifyContent="flex-start" alignItems="center">
            {
              userToken != null &&
              <Box>
                <MenuItem sx={{borderRadius:"8px"}} component={ Link } to="/courses">
                  <Typography>
                      COURSES
                  </Typography>
                </MenuItem>
              </Box>
            }
            {
              (location.pathname === "/courses" || location.pathname === "/courses/") && userToken != null &&
              <Box>
                <IconButton sx={{color:"white", mr:1}} size="large" onClick={openDialog}>
                  <AddIcon/>
                </IconButton>
              </Box>
            }
          </Grid>
          <Grid xs item display="flex" justifyContent="flex-end" alignItems="center">
            {
              userToken != null ?
              userIcon() :
              login()
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Toolbar/>
    <Drawer anchor="left" open={drawerOpen}>
      <Toolbar/>
      <List>
        <ListItem sx={{width: "250px"}}>
          <ListItemButton sx={{width: "100%"}}>Course</ListItemButton>
        </ListItem>
      </List>
    </Drawer>
    </>
  )
}

export default NavBar
