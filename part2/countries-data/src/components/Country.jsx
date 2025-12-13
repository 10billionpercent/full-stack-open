import axios from 'axios'
import {useState,useEffect} from 'react'
const Country = ({country}) => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    const [weather, setWeather] = useState({})

    useEffect(() => { if (!country.capital) return
      axios
      .get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: apiKey,
          q: country.capital[0],
        },
      })
      .then(res => setWeather(res.data))
    }, [country.capital])

if (!weather.current) return null 
    return (<div>
            <h1>{country.name.common}</h1>
            <p> Capital {country.capital} </p>
            <p> Area {country.area} </p>
            <p> Languages </p>
            {Object.values(country.languages).map((l, i) => <li key = {i}> {l} </li>)}
            <img src = {country.flags.png}/>

            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.current.temp_c} Celsius</p>
            <img style={{width: '60px', height: '60px'}} src={`https:${weather.current.condition.icon}`}/>
            <p>Wind {weather.current.wind_kph} km/h</p>
          </div>)
}
export default Country