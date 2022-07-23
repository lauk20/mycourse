import {
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import NewAssignmentDialog from "../components/NewAssignmentDialog"
import AssignmentDetailsCard from "../components/AssignmentDetailsCard"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCourse } from "../reducers/courseReducers"

const CoursePage = () => {
  const [openNewAssignDialog, setOpenNewAssignDialog] = useState(false)
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const openAssign = () => {
    setOpenNewAssignDialog(true)
  }

  const token = useSelector(state => {
    const login = state.login

    return login.token
  })

  const courseID = useParams().id;
  useEffect(() => {
    //dispatch(initializeCourses(token))
    getCourse(courseID, token)
      .then((c) => {
        setCourse(c)
        setAssignments(c.assignments.slice().sort((a, b) => {return new Date(a.due) - new Date(b.due)}))
      })
  }, [courseID, token])

  if (course === null) {
    return (
      <>
      </>
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
            <IconButton sx={{color: "white"}}>
              <SettingsIcon fontSize="large"/>
            </IconButton>
          </Box>
        </Card>
      </Grid>
      {
        assignments.map((assign) => {
          return (
            <AssignmentDetailsCard key={assign._id} assign={assign} assignments={assignments} setAssignments={setAssignments}/>
          )
        })
      }
    </Grid>
    <NewAssignmentDialog openNewAssignDialog={openNewAssignDialog} setOpenNewAssignDialog={setOpenNewAssignDialog} courseID={courseID} course={course.name} assignments={assignments} setAssignments={setAssignments}/>
    </>
  )
}

export default CoursePage
