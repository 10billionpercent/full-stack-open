const Country = ({country}) => {
  if (country.length === 0) return
    return (<div>
            <h1>{country.name.common}</h1>
            <p> Capital {country.capital} </p>
            <p> Area {country.area} </p>
            <p> Languages </p>
            {Object.values(country.languages).map((l, i) => <li key = {i}> {l} </li>)}
            <img src = {country.flags.png}/>
          </div>)
}
export default Country