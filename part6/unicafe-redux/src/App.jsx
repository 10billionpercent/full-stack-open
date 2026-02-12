import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>
}

const StatisticLine = (props) => {
  return <tr> 
  <td>{props.text} </td> 
  <td> {props.value} {props.text2} </td> 
  </tr>
}
const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/all
  const positive = (props.good/all)*100
  if (all ===0) {
    return (
      <>
      <h1> Statistics </h1>
      <p> No feedback given </p>
      </>

    )
  }
  return (
    <>
                <h1> Statistics </h1>
                <table> 
                  <tbody>
            <StatisticLine text="Good" value ={props.good}/>
            <StatisticLine text="Neutral" value ={props.neutral}/>
            <StatisticLine text="Bad" value ={props.bad}/>
            <StatisticLine text="All" value ={all}/>
            <StatisticLine text="Average" value ={average}/>
            <StatisticLine text="Positive" value ={positive} text2="%"/>
            </tbody>
            </table>
              
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
          <Button onClick={() => {
            setGood(0)
            setNeutral(0)
            setBad(0)
          }} text='Reset'/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
