import { useState } from 'react'

const Greatestvotes = (props) => {
  const copy = [...props.arr]
  var max = Math.max(...copy);
  var index = copy.indexOf(max)
  console.log(max)
  console.log(copy)
  console.log(index)
  return (
    <p> {props.anecdotes[index]} </p>
  )
}

const Inc = (arr, selected, func) => {
  const copy = [...arr]    
  copy[selected] += 1
  console.log(arr)
  return (
    func(copy)
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(7))
  return (
    <div>
      <p><strong>Anecdote of the Day</strong></p>
      {anecdotes[selected]}
      <p> has {votes[selected]} votes </p>
      <div>
        <button onClick = {() => Inc(votes, selected, setVotes)}> vote </button>
        <button onClick = {() => setSelected(Math.floor(Math.random()* 7))}>next anecdote</button>
      </div>
      <p><strong>Anecdote with the Most Votes</strong></p>
      <Greatestvotes arr = {votes} anecdotes = {anecdotes} />
    </div>
  )
}

export default App