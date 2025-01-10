import { useState } from 'react'

const Title = (props) => <h1> {props.title} </h1>

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

  return (
    <div>
      <Title title={title1} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Title title={title2} />

      <p>
      {"good"} {good} <br/> 
      {"neutral"} {neutral} <br/> 
      {"bad"} {bad} <br/> 
      {"all"} {all} <br/> 
      {"average"} {average} <br/> 
      {"positive"} {positive} %
      </p>

    </div>
  )
}


export default App