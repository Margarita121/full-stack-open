import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <p>
      {props.value}
    </p>
  )
}

const Votes = (props) => {
  return (
    <p>
      has {props.value} votes
    </p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]  
  const [selected, setSelected] = useState(0)
  const votesArray = new Uint8Array(7)
  const [votes, setVotes] = useState(votesArray)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleNextClick = () => {
    const currentAnecdoteNr = getRandomInt(anecdotes.length)
    setSelected(currentAnecdoteNr)
    console.log("current anecdote nr")
    console.log(currentAnecdoteNr)
  }

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    console.log("before updating votes")
    console.log(copyVotes)
    copyVotes[selected] += 1 
    setVotes(copyVotes)
    console.log("updated votes")
    console.log(copyVotes)
  }

  return (
    <div>
      <Anecdote value={anecdotes[selected]}/>
      <Votes value={votes[selected]}/>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
    </div>
  )
}

export default App