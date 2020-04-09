import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const Statistics = ({good, neutral, bad, positive}) => {
  return(
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="average" value ={(good-bad)/3} />
      <StatisticLine text="positive" value ={isNaN(positive) === true ? 0 : positive + "%"} />
    </table>
  )
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const positive = (good/(bad+neutral+good))*100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {isNaN(positive) === true ? <p>No feedback given</p> : <Statistics good={good} neutral={neutral} bad={bad} positive={positive}/>}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
);
