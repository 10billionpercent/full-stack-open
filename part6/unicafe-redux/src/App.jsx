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
    <div>
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
              
    </div>
  )
}

function App({ store }) {
  const goodRating = () => {
  store.dispatch({
    type: 'GOOD'
  })
}

const neutralRating = () => {
  store.dispatch({
    type: 'NEUTRAL'
  })
}

const badRating = () => {
  store.dispatch({
    type: 'BAD'
  })
}

const resetRating = () => {
  store.dispatch({
    type: 'RESET'
  })
}
  return (
    <>
      <h1> Give Feedback </h1>
      <div style = {{display: 'flex', flexDirection: 'row', gap: '12px'}}>
      <Button onClick={goodRating} text="Good"/>
        <Button onClick={neutralRating} text="Neutral"/>
          <Button onClick={badRating} text="Bad"/>
          <Button onClick={resetRating} text='Reset'/>
      </div>
            <Statistics good={store.getState().good} 
            neutral={store.getState().neutral} 
            bad={store.getState().bad}/>
    </>
  )
}

export default App