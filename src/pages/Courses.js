import {
  Grid,
} from "@mui/material"
import CourseCard from "../components/CourseCard"

const Courses = () => {
  return (
    <Grid container p={5} spacing={4}>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
      <Grid item>
        <CourseCard/>
      </Grid>
    </Grid>
  )
}

export default Courses
