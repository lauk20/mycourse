import {
  Grid,
} from "@mui/material"
import CourseCard from "../components/CourseCard"
import NewCourseDialog from "../components/NewCourseDialog"
import { useSelector } from "react-redux"

const Courses = ({openCourseDialog, setOpenCourseDialog}) => {
  const courses = useSelector(({courses}) => {
    return courses;
  })

  return (
    <>
      <Grid container p={5} spacing={4}>
      {courses.map(course =>
          <Grid key={course.name} item>
            <CourseCard title={course.name}/>
          </Grid>
      )}
      </Grid>
      <NewCourseDialog openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>
    </>
  )
}

export default Courses
