const Course = ({ course }) => (
  <div>
    {course.map(c => (
      <div key={c.id}>
        <Header course={c.name} />
        <Content parts={c.parts} />
      </div>
    ))}
  </div>
)

const Header = props => (
  <>
    <h2>{props.course}</h2>
  </>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => {
      return (
        <Part part={part} key={part.id} />
      )
    })}
    <Total parts={parts} />
  </div>
)

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <div>
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Course