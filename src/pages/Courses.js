import {
  Grid,
} from "@mui/material"
import CourseCard from "../components/CourseCard"
import NewCourseDialog from "../components/NewCourseDialog"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { initializeCourses } from "../reducers/courseReducers"

const Courses = ({openCourseDialog, setOpenCourseDialog}) => {
  const courses = useSelector(state => {
    return state.courses;
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeCourses())
  }, [dispatch])

  return (
    <>
      <Grid container p={5} spacing={4}>
      {courses.map(course =>
          <Grid key={course._id} item>
            <CourseCard title={course.name} courseID={course._id} course={course}/>
          </Grid>
      )}
      </Grid>
      <NewCourseDialog openCourseDialog={openCourseDialog} setOpenCourseDialog={setOpenCourseDialog}/>
    </>
  )
}

export default Courses
