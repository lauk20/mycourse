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
import { useSelector, useDispatch } from "react-redux"
import { differenceInDays, format, isBefore, parseISO } from "date-fns"
import EditAssignmentDialog from "./EditAssignmentDialog"
import { completeAssignment }  from "../reducers/assignmentReducers"
import { removeAssignment } from "../reducers/courseReducers"

const dateDisplay = (date) => {
  const today = parseISO(format(new Date(), "yyy-MM-dd"));
  const duedate = parseISO(date)
  //console.log("DUE: ", duedate)
  const diff = differenceInDays(duedate, today)
  //console.log(date, "A", duedate, today)
  /*
  if (isBefore(duedate, today) && !isToday(duedate, today)) {
    return "Due " + format(duedate, "MM-dd-yy") + " (Late)"
  }
  */
  if (diff === 0) {
    return "Due Today"
  } else if (diff === 1) {
    return "Due Tomorrow"
  } else if (diff < 7 && diff > 0) {
    return "Due " + format(duedate, "EEEE")
  } else {
    //console.log(duedate)
    return "Due " + format(duedate, "MM-dd-yy")
  }
}

const timeDisplay = (due) => {
  const today = new Date();
  const todayISO = today.toISOString();

  const nowIsBeforeDue = isBefore(parseISO(todayISO), parseISO(due));

  if (nowIsBeforeDue) {
    return format(parseISO(due), "hh:mm a")
  } else {
    return format(parseISO(due), "hh:mm a") + " (Late)"
  }
}

const AssignmentDetailsCard = ({ assign, assignments, setAssignments }) => {
  const [open, setOpen] = useState(false);
  const openDetails = () => {
    setOpen(!open)
  }

  const [openEditAssignDialog, setOpenEditAssignDialog] = useState(false);
  const [content, setContent] = useState(assign.content);
  const [details, setDetails] = useState(assign.details);
  const [due, setDue] = useState(assign.due)

  const token = useSelector(state => {
    const login = state.login

    return login.token
  })

  const dispatch = useDispatch();
  const completeAssignmentButton = async () => {
    dispatch(completeAssignment(assign._id, token));
    dispatch(removeAssignment(assign._id));
    setAssignments(assignments.filter(a => a._id !== assign._id))
    setOpen(false);
  }

  return (
    <>
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
                      <Typography color="white" variant="subtitle" sx={{width: "100%", fontWeight:"bold"}}>{content}</Typography>
                    </Box>
                  </Grid>
                  <Grid item sx={{height: "100%"}} display="flex" justifyContent="flex-start" alignItems="center">
                    <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{height: "100%", marginLeft: "auto", mr: 1}} fullWidth>
                      <Typography color="white" variant="caption" sx={{width: "120%", overflowWrap: "break-word"}}>{dateDisplay(due) + " - " + timeDisplay(due)}</Typography>
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
                  <Typography>{details}</Typography>
                </Grid>
                <Grid item>
                  <Typography color="white" variant="subtitle" sx={{fontWeight: "bold"}}>Due Date</Typography>
                  <Typography>{dateDisplay(due).split("Due")[1] + " - " + timeDisplay(due)}</Typography>
                </Grid>
                <Grid item display="flex">
                  <Button onClick={() => {setOpenEditAssignDialog(true);}} sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Edit Assignment</Button>
                  <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}} onClick={completeAssignmentButton}>Complete Assignment</Button>
                </Grid>
              </Grid>
            </Grow>
          </CardContent>
        }
        </Card>
      </Grid>
    </Slide>
    <EditAssignmentDialog openEditAssignDialog={openEditAssignDialog} setOpenEditAssignDialog={setOpenEditAssignDialog} assignment={assign} setAssignContent={setContent} setAssignDetails={setDetails} setAssignDue={setDue}/>
    </>
  )
}

export default AssignmentDetailsCard
