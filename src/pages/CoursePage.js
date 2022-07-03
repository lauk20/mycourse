import {
  Grid,
  ListItem,
  Card,
  CardMedia,
  Box,
  Typography,
  Avatar,
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { differenceInDays, format, isBefore, isToday, parseISO } from "date-fns"

const dateDisplay = (date) => {
  const today = parseISO(format(new Date(), "yyy-MM-dd"));
  const duedate = parseISO(date)
  //console.log("DUE: ", duedate)
  const diff = differenceInDays(duedate, today)
  //console.log(date, "A", duedate, today)
  if (isBefore(duedate, today) && !isToday(duedate, today)) {
    return date + " (Late)"
  }
  if (diff === 0) {
    return "Due Today"
  } else if (diff === 1) {
    return "Due Tomorrow"
  } else if (diff < 7 && diff > 0) {
    return "Due " + format(duedate, "EEEE")
  } else {
    return date
  }
}

const CoursePage = () => {
  const courseID = useParams().id;
  const course = useSelector(state => {
    const courses = state.courses;

    for (var i = 0; i < courses.length; i++) {
      if (courses[i]._id === courseID) {
        return courses[i]
      }
    }
  })
  const assignments = course.assignments.slice().sort((a, b) => {return new Date(a.due) - new Date(b.due)})
  console.log(assignments)
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{p: 5}} spacing={1}>
      <Grid item sx={{width: "100%", mb: 2}} display="flex" justifyContent="center">
        <Card sx={{position: "relative", width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
          <Box sx={{minWidth: 300, minHeight: 175, maxHeight: 175}}>
            <CardMedia component="img" image="https://static.vecteezy.com/system/resources/previews/002/381/744/non_2x/dark-geometric-black-abstract-background-elegent-design-pattern-free-vector.jpg" sx={{height: 175, overflow:"hidden"}}/>
          </Box>
          <Box display="flex" sx={{position: "absolute", bottom: 5, left: 0, pl: 2, justifyContent: "space-around"}}>
            <Typography sx={{color: "white", textDecoration: "none"}} variant="h4">{course.name}</Typography>
          </Box>
        </Card>
      </Grid>
      {
        assignments.map((assign) =>
          <Grid key={assign._id} item sx={{width: "100%"}} display="flex" justifyContent="center">
            <Card sx={{width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
              <Box display="flex" sx={{height: "100%", height: 85}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ml: 1}}>
                  <Avatar sx={{width: "100", height: "100", backgroundColor: "rgb(25, 25, 25)"}}>
                    <AssignmentIcon variant="large" sx={{color: "white"}}/>
                  </Avatar>
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{width: "85%", ml: 1}} fullWidth>
                  <Typography color="white" variant="subtitle" sx={{fontWeight:"bold"}}>{assign.content}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{float: "right", mr: 1}} fullWidth>
                  <Typography color="white" variant="caption">{dateDisplay(assign.due.slice('T'))}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        )
      }
      <Grid item sx={{width: "100%"}} display="flex" justifyContent="center">
        <Card sx={{width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
          <Box display="flex" sx={{height: "100%", height: 85}}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ml: 1}}>
              <Avatar sx={{width: "100", height: "100", backgroundColor: "rgb(25, 25, 25)"}}>
                <AssignmentIcon variant="large" sx={{color: "white"}}/>
              </Avatar>
            </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{width: "85%", ml: 1}} fullWidth>
              <Typography color="white" variant="subtitle" sx={{fontWeight:"bold"}}>TASK ASSIGNMENT 123</Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ml: 1}} fullWidth>
              <Typography color="white" variant="caption">Due Today</Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CoursePage
