import {
  Grid,
} from "@mui/material"
import CourseCard from "../components/CourseCard"
import NewCourseDialog from "../components/NewCourseDialog"
import { useSelector } from "react-redux"

const Courses = ({openCourseDialog, setOpenCourseDialog}) => {
  const courses = useSelector(state => {
    return state.courses;
  })

  return (
    <>
      <Grid container p={5} spacing={4}>
      {courses.map(course =>
          <Grid key={course._id} item>
            <CourseCard title={course.name} courseID={course._id}/>
          </Grid>
      )}
      </Grid>
      <NewCourseDialog openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>
    </>
  )
}

export default Courses
