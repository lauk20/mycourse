import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"

const CourseCard = ({ title }) => {
  return (
    <Card sx={{minWidth: 300, maxWidth: 300, background: "rgb(35, 35, 35)", overflow: "hidden"}}>
      <Box sx={{position: "relative"}}>
        <CardMedia component="img" image="https://media.istockphoto.com/vectors/abstract-navy-background-vector-id1146367630?k=20&m=1146367630&s=612x612&w=0&h=Ul1uZFXLlpgro0N8Jm5zk-z_TBVuUMwbHAFeF41bLkg=" height="85" sx={{overflow:"hidden"}}/>
        <Box display="flex" sx={{position: "absolute", bottom: 0, left: 0, pl: 2, justifyContent: "space-around"}}>
          <Typography component={ Link } to="/" sx={{color: "white", textDecoration: "none"}} variant="h6">COURSE</Typography>
        </Box>
        <Box display="flex" sx={{position: "absolute", bottom: 0, right: 0, pr: 0.5, justifyContent: "space-around"}}>
          <IconButton sx={{color: "white"}}>
            <AddIcon fontSize="small"/>
          </IconButton>
          <IconButton sx={{color: "white"}}>
            <SettingsIcon fontSize="small"/>
          </IconButton>
        </Box>
      </Box>
      <CardContent sx={{display: "flex", flexDirection: "column", maxHeight: 215, minWidth: 300, maxWidth: 300, overflow: "hidden"}}>
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
  )
}

export default CourseCard
