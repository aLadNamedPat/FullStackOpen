const Part = (props) => {
  return (
    <p>
      {props.text} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    props.parts.map(part => <Part text = {part.name} exercises = {part.exercises}/>)
  )
}

const Header = (props) => {
  return (
    <big><b>{props.notes.name}</b></big>
  )
}

const Total = (props) => {
  const initialVal = 0
  const total = props.parts.reduce( (previousVal, currentVal) => previousVal + currentVal.exercises, initialVal)
  return (
    <p>total of {total} exercises</p>
  )
}
const Course = (props) => {
  return(
    <>
      <Header notes = {props.course}/>
      <Content parts = {props.course.parts}/>
      <Total parts = {props.course.parts}/>
    </>
  )
}

const Courses = (props) => {
  return (
      props.courses.map(course => <Course course = {course}></Course>)
  )
}

export default Courses