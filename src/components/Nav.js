import { React, useState, useEffect } from "react";
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
  ListItemText,
  ListItemButton,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { initializeCourses } from "../reducers/courseReducers"

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

  const dispatch = useDispatch()
  useEffect(() => {
    if (userToken != null){
      dispatch(initializeCourses(userToken.token))
      document.title = "MyCourse - Courses"
    }
  }, [dispatch, userToken])

  const courses = useSelector(state => {
    return state.courses;
  })

  return (
    <>
    <AppBar color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <Grid container wrap="nowrap" overflow="auto">
          {userToken != null &&
            <Grid item>
              <IconButton onClick={() => {setDrawerOpen(!drawerOpen)}}sx={{color:"white", mr:1}} size="large">
                <MenuIcon/>
              </IconButton>
            </Grid>
          }
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
    {userToken &&
      <Drawer anchor="left" open={drawerOpen}>
        <Toolbar sx={{width: 250}}/>
        <List>
          {
            courses.map(course => {
              return (
                <ListItem key={course._id} sx={{width: "250px", m: 0}} disablePadding>
                  <ListItemButton onClick={()=>{setDrawerOpen(false)}} sx={{width: "100%", m: 0}} component={Link} to={"/courses/" + course._id.toString()}>
                    <ListItemText primary={course.name}/>
                  </ListItemButton>
                </ListItem>
              )
            })
          }
          <ListItem sx={{width: "250px", m: 0}} disablePadding>
            <ListItemButton onClick={openDialog} sx={{width: "100%", m: 0}}>
              <ListItemText primary={"Add a Course"}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    }
    </>
  )
}

export default NavBar
