import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Grow,
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { differenceInDays, format, isBefore, isToday, parseISO } from "date-fns"
import { styled } from "@mui/material/styles"
import { updateDetails } from "../reducers/assignmentReducers"

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

const AssignmentDetailsCard = ({ assign, counter }) => {
  const [open, setOpen] = useState(false);
  const openDetails = () => {
    setOpen(!open)
  }

  const dispatch = useDispatch();
  const [details, setDetails] = useState(assign.details);

  const saveDetails = () => {
    dispatch(updateDetails(assign._id, details))
  }
  console.log(assign)
  return (
    <Grow in={true} timeout={1000 + counter * 500}>
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
                  <WhiteBorderTextField value={details} onChange={(event) => setDetails(event.target.value)} minRows={3} fullWidth InputProps={{style: {color: "white"}}} sx={{input: {color: "white"}}} multiline/>
                </Grid>
                <Grid item display="flex">
                  <Button onClick={saveDetails} sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Save Details</Button>
                  <Button sx={{backgroundColor: "rgb(25, 25, 25)", color: "white", mr: 2}}>Complete Assignment</Button>
                </Grid>
              </Grid>
            </Grow>
          </CardContent>
        }
        </Card>
      </Grid>
    </Grow>
  )
}

export default AssignmentDetailsCard
