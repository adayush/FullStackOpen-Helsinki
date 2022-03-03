import { useState } from "react"

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const StatisticsLine = props => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({ stats }) => {
  const total = stats.good + stats.neutral + stats.bad
  const average = (stats.good*1 + stats.neutral*0 + stats.bad*-1) / total
  const positive = stats.good / total * 100

  if(total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={stats.good} />
        <StatisticsLine text='neutral' value={stats.neutral} />
        <StatisticsLine text='bad' value={stats.bad} />
        <StatisticsLine text='all' value={total} />
        <StatisticsLine text='average' value={average} />
        <StatisticsLine text='positive' value={positive.toString()+' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text='good' />
      <Button onClick={() => setNeutral(neutral+1)} text='neutral' />
      <Button onClick={() => setBad(bad+1)} text='bad' />

      <h1>statistics</h1>
      <Statistics stats={{good, neutral, bad}} />
    </div>
  )
}

export default App