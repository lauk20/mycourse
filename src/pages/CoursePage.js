import {
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ClickAwayListener,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import NewAssignmentDialog from "../components/NewAssignmentDialog"
import AssignmentDetailsCard from "../components/AssignmentDetailsCard"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getCourse, setCourseTitle, deleteCourse } from "../reducers/courseReducers"
import { styled } from "@mui/material/styles"

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

const EditCourseNameDialog = ({openEditCourseName, setOpenEditCourseName, course, courseID, token}) => {
  const [name, setName] = useState(course.name);

  const dispatch = useDispatch()
  const save = async () => {
    dispatch(setCourseTitle(courseID, name, token))
    setOpenEditCourseName(false);
    course.name = name;
  }

  return (
    <Dialog open={openEditCourseName}>
      <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Edit Course Title</DialogTitle>
      <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <DialogContentText sx={{mb: 2}}>Change the name of this course.</DialogContentText>
        <WhiteBorderTextField autoFocus id="name" label="Course Name" fullWidth value={name} onChange={(event) => {setName(event.target.value)}} sx={{input: {color: "white"}}}/>
      </DialogContent>
      <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <Button sx={{color: "white"}} onClick={() => {setOpenEditCourseName(false)}}>Cancel</Button>
        <Button sx={{color: "white"}} onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

const DeleteCourseDialog = ({openDeleteCourse, setOpenDeleteCourse, course, courseID, token}) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const del = async () => {
    dispatch(deleteCourse(courseID, token));
    navigate("/courses");
  }

  return (
    <Dialog open={openDeleteCourse}>
      <DialogTitle sx={{backgroundColor: "rgb(35, 35, 35)", color: "white"}}>Delete Course?</DialogTitle>
      <DialogContent sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <DialogContentText sx={{mb: 2}}>Deleting this course will remove it permanently. Please enter the course's name to confirm the deletion.</DialogContentText>
        <WhiteBorderTextField autoFocus id="name" label="Course Name" fullWidth value={name} onChange={(event) => {setName(event.target.value)}} sx={{input: {color: "white"}}}/>
      </DialogContent>
      <DialogActions sx={{backgroundColor: "rgb(35, 35, 35)"}}>
        <Button sx={{color: "white"}} onClick={() => {setOpenDeleteCourse(false)}}>Cancel</Button>
        <Button sx={{color: "white"}} onClick={() => {if (name === course.name){del()}}}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

const CoursePage = () => {
  const [openNewAssignDialog, setOpenNewAssignDialog] = useState(false)
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);

  //Snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState("Success");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success")

  //Menu States
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  //Edit Course Dialog States
  const [openEditCourseName, setOpenEditCourseName] = useState(false);

  //Delete Course Dialog States
  const [openDeleteCourse, setOpenDeleteCourse] = useState(false);

  //Loading
  const [loading, setLoading] = useState(true);

  const openAssign = () => {
    setOpenNewAssignDialog(true)
  }

  const snackbarClose = () => {
    setSnackbarOpen(false);
  }

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const token = useSelector(state => {
    const login = state.login

    return login.token
  })

  const courseID = useParams().id;
  useEffect(() => {
    document.title = "MyCourse"
  }, [])
  useEffect(() => {
    //dispatch(initializeCourses(token))
    getCourse(courseID, token)
      .then(c => {
        setCourse(c)
        setAssignments(c.assignments.slice().sort((a, b) => {return new Date(a.due) - new Date(b.due)}))
        document.title = "MyCourse - " + c.name
        setLoading(false)
      })
      .catch(err => {
        setCourse(undefined)
        setLoading(false)
      });
  }, [courseID, token])

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress/>
      </Backdrop>
    )
  } else if (course === undefined) {
    return (
      <Backdrop open={true}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">Course Not Found</Typography>
          <Button component={Link} to="/courses">Return to Courses</Button>
        </Box>
      </Backdrop>
    )
  }

  return (
    <>
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{p: 5}} spacing={1}>
      <Grid item sx={{width: "100%", mb: 2}} display="flex" justifyContent="center">
        <Card sx={{position: "relative", width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
          <Box sx={{minWidth: 300, minHeight: 175, maxHeight: 175}}>
            <CardMedia component="img" image="https://static.vecteezy.com/system/resources/previews/002/381/744/non_2x/dark-geometric-black-abstract-background-elegent-design-pattern-free-vector.jpg" sx={{height: 175, overflow:"hidden"}}/>
          </Box>
          <Box display="flex" sx={{position: "absolute", bottom: 5, left: 0, pl: 2, justifyContent: "space-around"}}>
            <Typography sx={{color: "white", textDecoration: "none"}} variant="h4">{course.name}</Typography>
          </Box>
          <Box display="flex" sx={{position: "absolute", bottom: 0, right: 0, pr: 0.5, justifyContent: "space-around"}}>
            <IconButton sx={{color: "white"}} onClick={openAssign}>
              <AddIcon fontSize="large"/>
            </IconButton>
            <ClickAwayListener onClickAway={closeMenu}>
              <Box>
                <IconButton sx={{color: "white"}} onClick={openMenu}>
                  <SettingsIcon fontSize="large"/>
                </IconButton>
                <Menu anchorEl={menuAnchor} open={menuOpen} onClose={closeMenu}>
                  <MenuItem onClick={() => {setOpenEditCourseName(true); closeMenu()}}>Edit Course Title</MenuItem>
                  <MenuItem onClick={() => {setOpenDeleteCourse(true); closeMenu()}}>Delete Course</MenuItem>
                  <MenuItem onClick={closeMenu}>Cancel</MenuItem>
                </Menu>
              </Box>
            </ClickAwayListener>
          </Box>
        </Card>
      </Grid>
      {
        assignments.map((assign) => {
          return (
            <AssignmentDetailsCard key={assign._id} assign={assign} assignments={assignments} setAssignments={setAssignments} setSnackbarOpen={setSnackbarOpen} setSnackbarText={setSnackbarText} setSnackbarSeverity={setSnackbarSeverity}/>
          )
        })
      }
    </Grid>
    <NewAssignmentDialog openNewAssignDialog={openNewAssignDialog} setOpenNewAssignDialog={setOpenNewAssignDialog} courseID={courseID} course={course.name} assignments={assignments} setAssignments={setAssignments} setSnackbarOpen={setSnackbarOpen} setSnackbarText={setSnackbarText} setSnackbarSeverity={setSnackbarSeverity}/>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={snackbarClose}>
      <Alert variant="outlined" severity={snackbarSeverity} onClose={snackbarClose}>
        {snackbarText}
      </Alert>
    </Snackbar>
    <EditCourseNameDialog openEditCourseName={openEditCourseName} setOpenEditCourseName={setOpenEditCourseName} course={course} courseID={courseID} token={token}/>
    <DeleteCourseDialog openDeleteCourse={openDeleteCourse} setOpenDeleteCourse={setOpenDeleteCourse} course={course} courseID={courseID} token={token}/>
    </>
  )
}

export default CoursePage
