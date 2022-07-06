import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"
import NewAssignmentDialog from "./NewAssignmentDialog"
import { useState } from "react"
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
    return "Today"
  } else if (diff === 1) {
    return "Tomorrow"
  } else if (diff < 7 && diff > 0) {
    return format(duedate, "EEEE")
  } else {
    return date
  }
}

const assignmentDateDisplay = (assignment) => {
  return format(parseISO(assignment.due), "h:m a") + " - " + assignment.content
}

const CourseCard = ({ title, courseID, course}) => {
  const [openNewAssignDialog, setOpenNewAssignDialog] = useState(false)

  const openAssign = () => {
    setOpenNewAssignDialog(true)
  }

  //console.log(course.assignments)

  const assignments = course.assignments.slice().sort((a, b) => {return new Date(a.due) - new Date(b.due)})

  //console.log(assignments)

  const assignmentsObj = { };
  assignments.forEach((assign) => {
    const date = assign.due.split("T")[0]
    if (assignmentsObj[date]) {
      assignmentsObj[date].push(assign)
    } else {
      assignmentsObj[date] = [assign]
    }
  })

  //console.log(assignmentsObj)

  return (
    <>
    <Card sx={{minWidth: 300, maxWidth: 300, background: "rgb(35, 35, 35)", overflow: "hidden"}}>
      <Box sx={{position: "relative"}}>
        <CardActionArea component={ Link } to={"/courses/"+course._id}>
          <CardMedia component="img" image="https://static.vecteezy.com/system/resources/previews/002/381/744/non_2x/dark-geometric-black-abstract-background-elegent-design-pattern-free-vector.jpg" height="85" sx={{overflow:"hidden"}}/>
        </CardActionArea>
        <Box display="flex" sx={{position: "absolute", bottom: 0, left: 0, pl: 2, justifyContent: "space-around"}}>
          <Typography component={ Link } to={"/courses/"+course._id} sx={{color: "white", textDecoration: "none"}} variant="h6">{title}</Typography>
        </Box>
        <Box display="flex" sx={{position: "absolute", bottom: 0, right: 0, pr: 0.5, justifyContent: "space-around"}}>
          <IconButton sx={{color: "white"}} onClick={openAssign}>
            <AddIcon fontSize="small"/>
          </IconButton>
          <IconButton sx={{color: "white"}}>
            <SettingsIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Box>
      <CardContent sx={{display: "flex", flexDirection: "column", height: 215, minWidth: 300, maxWidth: 300, overflow: "hidden"}}>
        {
          Object.keys(assignmentsObj).map(key =>
            <Box key={key} sx={{mb: 2}}>
              <Typography sx={{color: "white"}} variant="subtitle2">{dateDisplay(key)}</Typography>
              {
                assignmentsObj[key].map(item =>
                  <div key={item._id}>
                    <Typography key={item._id} component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">{assignmentDateDisplay(item)}</Typography>
                    <br/>
                  </div>
                )
              }
            </Box>
          )
        }
      </CardContent>
      <CardActions>
        <Button sx={{color: "white"}}>
          Show All
        </Button>
      </CardActions>
    </Card>
    <NewAssignmentDialog openNewAssignDialog={openNewAssignDialog} setOpenNewAssignDialog={setOpenNewAssignDialog} courseID={courseID}/>
    </>
  )
}

export default CourseCard
