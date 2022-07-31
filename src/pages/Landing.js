import { useEffect, useRef } from "react"
import {
  Grid,
  Typography,
  Box,
  Button,
  Toolbar,
  Slide,
  Fade,
  Grow,
  GlobalStyles,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import courseImg from "../images/course.png"
import landingImg from "../images/landingbg.png"

const homePageStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundImage: `url(${landingImg})`,
        backgroundSize: "100vw 100vh",
        backgroundRepeat: "no-repeat"
      },
    }}
  />
);

const Landing = ({userToken}) => {
  const navigate = useNavigate();

  if (userToken != null) {
    navigate("/courses");
  }

  useEffect(() => {
    document.title = "MyCourse - Get Started"
  }, [])

  const containerRef = useRef(null)

  return (
    <>
      {homePageStyles}
      <Toolbar/>
      <Box sx={{height:"75vh"}} display="flex" justifyContent="center">
        <Grid container sx={{p: 5, height: "100%", m:0}} display="flex" justifyContent="center" flexDirection="row" alignItems="center">
          <Grid item sx={{p: 5, height: "100%"}} display="flex" justifyContent="center" flexDirection="column" alignItems="center" ref={containerRef}>
            <Slide direction ="down" in={true} mountOnEnter unmountOnExit timeout={1000} container={containerRef.current}>
              <Grid item display="flex" justifyContent="center">
                <Typography variant="h1" spacing={1} sx={{mr: 1, letterSpacing:"0.3rem", fontWeight: 60, textAlign: "center"}}>MYCOURSE</Typography>
              </Grid>
            </Slide>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit container={containerRef.current} timeout={1000} container={containerRef.current}>
              <Grid item display="flex" justifyContent="center">
                <Typography variant="h6" spacing={1} sx={{mr: 1, letterSpacing:"0.3rem", fontWeight: 60, textAlign: "center"}}>YOUR PERSONAL COURSEWORK MANAGEMENT TOOL</Typography>
              </Grid>
            </Slide>
            <Slide direction="down" in={true} timeout={1000} container={containerRef.current}>
              <Grid item display="flex" justifyContent="center" sx={{mt: 5}}>
                <Button component={Link} to="/signup" sx={{fontSize: 25, color: "white", backgroundColor: "rgb(35, 35, 35)", fontWeight: 60}}>GET STARTED</Button>
              </Grid>
            </Slide>
          </Grid>
          <Grid item sx={{p: 5, height: "100%"}} display="flex" justifyContent="center" flexDirection="column">
            <Slide direction="down" in={true} timeout={500} container={containerRef.current}>
              <Grid item display="flex" justifyContent="center">
                <Box component="img" sx={{height:"75vh"}} src={courseImg}/>
              </Grid>
            </Slide>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Landing
