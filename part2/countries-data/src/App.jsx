import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [country, setCountry] = useState('')
  const [data, setData] = useState([])
  const [content, setContent] = useState(null)
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response =>
          setData(response.data)
        )
  })
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  }

  const submitCountry = (e) => {
        e.preventDefault()
        const names = data.map(country => country.name.common)
        const countries = names.filter(c => c.toLowerCase().includes(country))
        if (countries.length > 10) {
          setContent("Too many matches, specify another filter")
          setTimeout(() => {
            setContent('')
          }, 5000)
        }
        else if (countries.length > 1 && countries.length < 10) {
          if (countries.some(c => c.toLowerCase() === country)) {
           axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
          .then(response => setCountryData(response.data))
          console.log(countryData)
          setContent(<div>
            <h1>{countryData.name.common}</h1>
            <p> Capital {countryData.capital} </p>
            <p> Area {countryData.area} </p>
            <p> Languages </p>
            {Object.values(countryData.languages).map((l, i) => <li key = {i}> {l} </li>)}
            <img src = {countryData.flags.png}/>
          </div>)
        }
        else {
           setContent(countries.map((c,i) => <p key = {i}> {c} </p>)) }
        }
        else if (countries.length === 1) {
           axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
          .then(response => setCountryData(response.data))
          console.log(countryData)
        }

        else {
          setContent('no matches found')
          setTimeout(() => {
            setContent('')
          }, 5000)
        }
        
  }

  return (
    <div>
    <input value={country} onChange={handleCountryChange} placeholder='enter country name'/> 
    <button onClick={submitCountry}> meow </button>
    <div> 
      {content}
      </div>
    </div>
  )
}

export default App
