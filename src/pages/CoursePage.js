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

const iconStyles = {
  large: {
    width: 100,
    height: 100,
  }
}

const CoursePage = () => {
  //const courseID = useParams().course;

  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{p: 5}} spacing={1}>
      <Grid item sx={{width: "100%", mb: 2}} display="flex" justifyContent="center">
        <Card sx={{position: "relative", width: "100%", maxWidth: 1015, backgroundColor: "rgb(35, 35, 35)"}}>
          <Box sx={{minWidth: 300, minHeight: 175, maxHeight: 175}}>
            <CardMedia component="img" image="https://static.vecteezy.com/system/resources/previews/002/381/744/non_2x/dark-geometric-black-abstract-background-elegent-design-pattern-free-vector.jpg" sx={{height: 175, overflow:"hidden"}}/>
          </Box>
          <Box display="flex" sx={{position: "absolute", bottom: 5, left: 0, pl: 2, justifyContent: "space-around"}}>
            <Typography sx={{color: "white", textDecoration: "none"}} variant="h4">COURSE</Typography>
          </Box>
        </Card>
      </Grid>
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
