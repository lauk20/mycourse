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
  Menu,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { initializeCourses } from "../reducers/courseReducers"
import { logoutSession } from "../reducers/loginReducers"

const NavBar = ({setOpenCourseDialog}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const openDialog = () => {
    setOpenCourseDialog(true);
  }

  const location = useLocation();

  const userToken = useSelector(state => {
    const login = state.login
    return login;
  })

  //Menu States
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(logoutSession());
    navigate("/login")
    window.location.reload(true);
  }

  const userIcon = () => (
    <>
      <Typography>{userToken.username}</Typography>
      <Box>
        <IconButton sx={{color:"white", mr:1}} size="large" onClick={openMenu}>
          <AccountCircleIcon/>
        </IconButton>
        <Menu anchorEl={menuAnchor} open={menuOpen} onClose={closeMenu}>
          <MenuItem onClick={() => {closeMenu(); logout();}}>Logout</MenuItem>
        </Menu>
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
          {!isMobile &&
            <Grid item display="flex" justifyContent="flex-start" alignItems="center">
              <Typography variant="h6" sx={{mr: 1, letterSpacing:"0.3rem"}}>
                MYCOURSE
              </Typography>
            </Grid>
          }
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
          { isMobile &&
            <ListItem sx={{width: "250px", ml: 1}} disablePadding>
              <Typography variant="h6" sx={{mr: 1, mt: 1, letterSpacing:"0.3rem", textAlign: "center"}}>
                MYCOURSE
              </Typography>
            </ListItem>
          }
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
