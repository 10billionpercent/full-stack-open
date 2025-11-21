import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive = (props.good/all)*100
  return (
    <>
                <h1> Statistics </h1>
            <p> Good = {props.good} </p>
            <p> Neutral = {props.neutral} </p>
            <p> Bad = {props.bad} </p>
                 <p> All = {all} </p>
              <p> Average = {average} </p>
              <p> Positive = {positive} % </p>
    </>
  )
}
function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1> Give Feedback </h1>
      <Button onClick={() => setGood(good+1)} text="Good"/>
        <Button onClick={() => setNeutral(neutral+1)} text="Neutral"/>
          <Button onClick={() => setBad(bad+1)} text="Bad"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
