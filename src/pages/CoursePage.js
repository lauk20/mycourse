import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Grow,
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import NewAssignmentDialog from "../components/NewAssignmentDialog"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { differenceInDays, format, isBefore, isToday, parseISO } from "date-fns"
import { initializeCourses } from "../reducers/courseReducers"
import { styled } from "@mui/material/styles"

const dateDisplay = (date) => {
  const today = parseISO(format(new Date(), "yyy-MM-dd"));
  const duedate = parseISO(date)
  //console.log("DUE: ", duedate)
  const diff = differenceInDays(duedate, today)
  console.log(date, "A", duedate, today)
  if (isBefore(duedate, today) && !isToday(duedate, today)) {
    return "Due " + format(duedate, "MM-dd-yy") + " (Late)"
  }
  if (diff === 0) {
    return "Due Today"
  } else if (diff === 1) {
    return "Due Tomorrow"
  } else if (diff < 7 && diff > 0) {
    return "Due " + format(duedate, "EEEE")
  } else {
    console.log(duedate)
    return "Due " + format(duedate, "MM-dd-yy")
  }
}

const timeDisplay = (assignment) => {
  return format(parseISO(assignment.due), "h:m a")
}

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

const CoursePage = () => {
  let counter = 1;
  const [openNewAssignDialog, setOpenNewAssignDialog] = useState(false)
  const [open, setOpen] = useState(false);
  const [assignID, setAssignID] = useState(false);

  const openAssign = () => {
    setOpenNewAssignDialog(true)
  }

  const openDetails = (id) => {
    return (event) => {
      if (id === assignID){
        setOpen(false)
        setAssignID(undefined)
      } else {
        setOpen(true)
        setAssignID(id)
      }
    }
  }

  const token = useSelector(state => {
    const login = state.login

    return login.token
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeCourses(token))
  }, [dispatch, token])

  const courseID = useParams().id;
  const course = useSelector(state => {
    const courses = state.courses;

    for (var i = 0; i < courses.length; i++) {
      if (courses[i]._id === courseID) {
        return courses[i]
      }
    }
  })

  if (course === undefined) {
    return (
      <>
      </>
    )
  }

  const assignments = course.assignments.slice().sort((a, b) => {return new Date(a.due) - new Date(b.due)})

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
        assignments.map((assign) => { counter = counter + 1;
          return (
          <Grow key={assign._id} in={true} timeout={1000 + counter * 500}>
          <Grid item key={assign._id} sx={{width: "100%"}} display="flex" justifyContent="center">
            <Card sx={{width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
                <CardActionArea onClick={openDetails(assign._id)}>
                <Box display="flex" sx={{height: 85}}>
                  <Grid container>
                    <Grid item sx={{height: "100%"}} display="flex" justifyContent="center" alignItems="center">
                      <Box display="flex" justifyContent="center" alignItems="center" sx={{ml: 1}}>
                        <Avatar sx={{width: "100", height: "100", backgroundColor: "rgb(25, 25, 25)"}}>
                          <AssignmentIcon variant="large" sx={{color: "white"}}/>
                        </Avatar>
                      </Box>
                    </Grid>
                    <Grid item sx={{height: "100%"}} display="flex" justifyContent="flex-start" alignItems="center" xs>
                      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{width: "85%", ml: 1}} fullWidth>
                        <Typography color="white" variant="subtitle" sx={{width: "100%", fontWeight:"bold"}}>{assign.content}</Typography>
                      </Box>
                    </Grid>
                    <Grid item sx={{height: "100%"}} display="flex" justifyContent="flex-start" alignItems="center">
                      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{height: "100%", marginLeft: "auto", mr: 1}} fullWidth>
                        <Typography color="white" variant="caption" sx={{width: "120%", overflowWrap: "break-word"}}>{dateDisplay(assign.due) + " - " + timeDisplay(assign)}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardActionArea>
              {open && assignID === assign._id &&
              <CardContent>
                <Grid container display="flex" flexDirection="column" spacing={2}>
                  <Grid item>
                    <Typography color="white" variant="subtitle" sx={{fontWeight: "bold"}}>Details</Typography>
                    <WhiteBorderTextField fullWidth InputProps={{style: {color: "white"}}} sx={{input: {color: "white"}}} multiline/>
                  </Grid>
                  <Grid item display="flex">
                    <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Save Details</Button>
                    <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Complete Assignment</Button>
                  </Grid>
                </Grid>
              </CardContent>
              }
            </Card>
          </Grid>
          </Grow>
          )}
        )
      }
    </Grid>
    <NewAssignmentDialog openNewAssignDialog={openNewAssignDialog} setOpenNewAssignDialog={setOpenNewAssignDialog} courseID={courseID}/>
    </>
  )
}

export default CoursePage
