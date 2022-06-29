import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchOption = (props) => {
  const handleSearch = (event) => {
    props.setSearchVal(event.target.value)
  }

  const handleNames = () => {
    let total = 0
    for (const country of props.countries)
    {
      if (country.name.common.indexOf(props.searchVal) >= 0)
      {
         total += 1
      }
    }
    return total
  }

  return (
    <>
      <p>Search country here</p>
      <input onChange = {handleSearch} />
    </>
  )
}

const WeatherModule = (props) => {
  const [weatherData, setWeatherData] = useState([])
  const hook = () => {
    console.log(props.lat)
    console.log(props.lon)
    console.log(props.api_key)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${props.api_key}`).then(
        response => 
        {
      console.log(response.data)
      console.log('promise fufilled')
      setWeatherData(response.data)
        }
    )
  }
  useEffect(hook, [])

    return (
        <>
          {weatherData.main ? (
          <div>
            <h1>Weather in {props.capital}</h1>
            <p>temperature is {(weatherData.main.temp - 273.15).toFixed(2)} degrees celsius</p>
            <img src = {`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
            <p>wind is {weatherData.wind.speed} m/s</p>
          </div>
          ) : null}
        </>
    )
}

const CountriesToShow = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    props.setSearchVal(event.target.name)
    console.log(event)
  }

  if (props.countries.length === 1)
  {
    return (
      <>
        <h2>{props.countries[0].name.common}</h2>
        <p>capital {props.countries[0].capital[0]}</p>
        <p>area {props.countries[0].area}</p>

        <p><b>languages</b></p>

        <ul>
          {Object.values(props.countries[0].languages).map(language => <li key = {language}>{language}</li>)}
        </ul>
        <img src = {props.countries[0].flags.png}/>
        <WeatherModule lat = {props.countries[0].capitalInfo.latlng[0]} capital = {props.countries[0].capital} lon = {props.countries[0].capitalInfo.latlng[1]} api_key = {props.api_key}/>
      </>
    )
  }
  else if (props.countries.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  else {
    return (
      props.countries.map(country => <form key = {country.name.common} onSubmit = {handleSubmit} name = {country.name.common}>
                                      <p key = {country.name.common}>{country.name.common} <button type = "submit" key = {country.name.common}>show</button> </p> 
                                    </form>)
    )
  }
}

const App = () => {
  const [searchVal, setSearchVal] = useState('')
  const [countries, setCountries] = useState([])
  const api_key = process.env.REACT_APP_API_KEY


  const hook = () => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => 
    {
      console.log('promise fufilled')
      setCountries(response.data)
    }
  )
  }
  useEffect(hook, [])

  const countriesToShow = countries.filter(country => country.name.common.indexOf(searchVal) >= 0)

  return (
    <div>
      <SearchOption setSearchVal = {setSearchVal} searchVal = {searchVal}/>
      <CountriesToShow countries = {countriesToShow} setSearchVal = {setSearchVal} api_key = {api_key}/>
    </div>
  )
}

export default App