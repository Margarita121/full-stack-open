import { useState } from 'react'

const Title = (props) => <h1> {props.title} </h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value} {props.sign}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.stats.all.length === 0) {
    return <div> No feedback given </div>
  }
  return (
    <table>
      <StatisticLine text="good" value ={props.stats.good}/>
      <StatisticLine text="neutral" value ={props.stats.neutral}/>
      <StatisticLine text="bad" value ={props.stats.bad}/>
      <StatisticLine text="all" value ={props.stats.all}/>
      <StatisticLine text="average" value ={props.stats.average}/>
      <StatisticLine text="positive" value ={props.stats.positive} sign={"%"}/>
    </table>
  )
}

const App = () => {
  const title1 = "give feedback"
  const title2 = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)
    const updatedAverage = (updatedGood - bad) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = (updatedGood/updatedAll) * 100
    setPositive(updatedPositive)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = good + updatedNeutral + bad
    setAll(updatedAll)
    const updatedAverage = (good - bad) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = (good/updatedAll) * 100
    setPositive(updatedPositive)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = good + neutral + updatedBad
    setAll(updatedAll)
    const updatedAverage = (good - updatedBad) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = (good/updatedAll) * 100
    setPositive(updatedPositive)
  }

  let stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <Title title={title1} />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Title title={title2} />
      <Statistics stats = {stats}/>
    </div>
  )
}

export default App