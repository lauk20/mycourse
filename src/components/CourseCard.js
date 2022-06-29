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

const CourseCard = ({ title, courseID }) => {
  const [openNewAssignDialog, setOpenNewAssignDialog] = useState(false)

  const openAssign = () => {
    setOpenNewAssignDialog(true)
  }

  return (
    <>
    <Card sx={{minWidth: 300, maxWidth: 300, background: "rgb(35, 35, 35)", overflow: "hidden"}}>
      <Box sx={{position: "relative"}}>
        <CardActionArea>
          <CardMedia component="img" image="https://static.vecteezy.com/system/resources/previews/002/381/744/non_2x/dark-geometric-black-abstract-background-elegent-design-pattern-free-vector.jpg" height="85" sx={{overflow:"hidden"}}/>
        </CardActionArea>
        <Box display="flex" sx={{position: "absolute", bottom: 0, left: 0, pl: 2, justifyContent: "space-around"}}>
          <Typography component={ Link } to="/" sx={{color: "white", textDecoration: "none"}} variant="h6">{title}</Typography>
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
        <Box sx={{mb: 2}}>
          <Typography sx={{color: "white"}} variant="subtitle2">Today</Typography>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
        </Box>
        <Box sx={{mb: 2}}>
          <Typography sx={{color: "white"}} variant="subtitle2">Today</Typography>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
          <Typography component={Link} to="/" sx={{color: "white", pl: 1, textDecoration: "none"}} variant="caption">TASK</Typography>
          <br/>
        </Box>
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
