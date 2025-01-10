import { useState } from 'react'

const Title = (props) => <h1> {props.title} </h1>

const App = () => {
  const title1 = "give feedback"
  const title2 = "statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title title={title1} />
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Title title={title2} />

      <p>
      {"good"} {good} <br /> 
      {"neutral"} {neutral} <br /> 
      {"bad"} {bad}
      </p>

    </div>
  )
}


export default App