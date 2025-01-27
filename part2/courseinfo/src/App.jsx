const Header = (props) => <h1>{props.course.name}</h1>
const Part = (props) => <p> {props.part.name} {props.part.exercises}</p>
const Content = (props) => {
  return (
    props.course.parts.map(part =>
      <div key={part.id}>
        <Part part={part}/>
      </div>
    )
  )
}
const Total = (props) => {
  var totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App