import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import './App.css'

function App() {
  const [country, setCountry] = useState('')
  const [data, setData] = useState([])
  const [query, setQuery] = useState(null)
  const [content, setContent] = useState([])
  const [type, setType] = useState('')

  useEffect(() => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response =>
          setData(response.data)
        )
  }, [])
  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  }

  const submitCountry = (e) => {
        e.preventDefault()
        const names = data.map(country => country.name.common)
        const countries = names.filter(c => c.toLowerCase().includes(country.toLowerCase()))
        if (countries.length === 1) {
          setQuery(countries[0].toLowerCase())
        }
        else if (countries.length > 1 && countries.length < 10) {
         setQuery(countries.find(c => c.toLowerCase() === country.toLowerCase()))
        }
     }
       const getCountryData = (query) => {
        if (!query) {
        setContent(countries)
        setType('array')
      }
    axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query}`)
          .then(response => {const d = response.data
          setContent(d)
          setType('object')
          })
          .catch(() =>console.log('meow'))
  }


useEffect(() =>{if (query) {getCountryData(query)}}, [query])   

  return (
    <div>
    <input value={country} onChange={handleCountryChange} placeholder='enter country name'/> 
    <button onClick={submitCountry}> search </button>
    <Content contentData={content} type={type} searchHandler={getCountryData}/>
    </div>
  )
}
export default App
