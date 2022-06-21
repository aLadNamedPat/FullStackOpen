import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  if (total === 0) {
    return (
    <div>
      <p>STATISTICS</p>
      <p>No feedback given</p>
    </div>
    )
  }
  return (
  <div>
    <p>STATISTICS</p>
    <table>
      <tbody>
        <StatisticsLine text = "good" value = {props.good} />
        <StatisticsLine text = "neutral" value = {props.neutral} />
        <StatisticsLine text = "bad" value = {props.bad} />
        <tr>
          <td>average</td> 
          <td>{(props.good - props.bad) / (total)}</td>
        </tr>
        <tr>
          <td>positive</td> 
          <td>{(props.good * 100) / total}%</td>
        </tr>
      </tbody>

    </table>

  </div>
  )

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p> Give feedback</p>
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App