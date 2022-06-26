import {
  Grid,
} from "@mui/material"
import CourseCard from "../components/CourseCard"
import NewCourseDialog from "../components/NewCourseDialog"

const Courses = ({openCourseDialog, setOpenCourseDialog}) => {
  return (
    <>
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
      <NewCourseDialog openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>
    </>
  )
}

export default Courses
