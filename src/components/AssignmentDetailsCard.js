import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  Slide,
  Grow,
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from "react"
import { differenceInDays, format, isBefore, isToday, parseISO } from "date-fns"

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
  return format(parseISO(assignment.due), "hh:mm a")
}

const AssignmentDetailsCard = ({ assign }) => {
  const [open, setOpen] = useState(false);
  const openDetails = () => {
    setOpen(!open)
  }

  return (
    <Slide in={true} timeout={1000} direction="up">
      <Grid item sx={{width: "100%"}} display="flex" justifyContent="center">
        <Card sx={{width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
            <CardActionArea onClick={openDetails}>
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
          {open &&
          <CardContent>
            <Grow in={open} timeout={1000}>
              <Grid container display="flex" flexDirection="column" spacing={2}>
                <Grid item>
                  <Typography color="white" variant="subtitle" sx={{fontWeight: "bold"}}>Details</Typography>
                  <Typography>{assign.details}</Typography>
                </Grid>
                <Grid item>
                  <Typography color="white" variant="subtitle" sx={{fontWeight: "bold"}}>Due Date</Typography>
                  <Typography>{dateDisplay(assign.due).split("Due")[1] + " - " + timeDisplay(assign)}</Typography>
                </Grid>
                <Grid item display="flex">
                  <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Edit Assignment</Button>
                  <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Complete Assignment</Button>
                </Grid>
              </Grid>
            </Grow>
          </CardContent>
        }
        </Card>
      </Grid>
    </Slide>
  )
}

export default AssignmentDetailsCard
