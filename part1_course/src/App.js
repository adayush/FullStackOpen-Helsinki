const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Ayush" age={26+10} />
      <Hello name="Vijay" age={age} />
    </div>
  )
}

export default App