import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Filter = ({toShow, onChangeHandler}) => {
  return (
    <div>
      <span>Hae maita </span>
      <input
        id="filter"
        name="filter"
        type="text"
        value={toShow}
        onChange={onChangeHandler}
      />
    </div>
  )
}

const Weather = ({city}) => {

  const endpoint = useState(`https://api.apixu.com/v1/current.json?key=d68ee55761624662b8870114191305&q=${city}`)
  const [data, setData] = useState(null)
  useEffect(() => {
    axios
      .get(endpoint)
      .then(response => {
        setData(response.data.current)
        

      })
  }, [endpoint])

  if (data === null) {
    return (<div></div>)
  }

  return (
    
    <div>
      <p>Lämpötila: <span>{data.temp_c} &#8451;</span></p>
      <img
        src={data.condition.icon}
        alt={data.condition.text}
        width="64"
        height="64"
      />
      <p>Tuuli: <span>{data.wind_kph} km/h suunta {data.wind_dir}</span></p>
    </div>
  )
}

const CountryDetails = ( {country} ) => {

  return (
    <div>
      <h2>{country.name}</h2>

      <p>Pääkaupunki <span>{country.capital}</span></p>
      <p>Väkiluku <span>{country.population}</span></p>

      <h3>Kielet</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}        
      </ul>
      <img
        src={country.flag}
        alt="Lippu"
        width="128"
        height="128"
      />

    <h3>Säätila {country.capital}</h3>
      <Weather city={country.capital} />
    </div>
  )
}

const Country = ( {value, onClickHandler} ) => {
  return (
    <div>
      <span>{value.name}</span>
      <button onClick={onClickHandler(value)}>Näytä</button>
    </div>
  )
}

const Countries = ( { countries, show, onClickHandler} ) => {
  countries = countries
    .filter(country =>
      country.name
        .toLowerCase()
        .includes(show.toLowerCase())
      )
    

  if (countries.length > 10) {
    return (
      <p>Liikaa osumia, ole hyvä ja rajaa hakuehtoja!</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries
          .map(country =>
            <Country
              key={country.name}
              value={country}
              onClickHandler={onClickHandler}
            />
          )
        }
      </div>
    )
  } else if (countries.length === 1) {
    return (
    <div>
      {countries
        .map(country =>
          <CountryDetails
            key={country.name}
            country={country}
          />
        )
      }
      </div>
    )
  } else {
    return <p>Ei hakuehtoja täyttäviä osumia!</p>
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [criteria, setCriteria] = useState('')

  const endpoint = 'https://restcountries.eu/rest/v2/all'
  
  const hook = () => {
    axios
      .get(endpoint)
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    setCriteria(event.target.value)
  }

  const handleClick = (value) => (event) => {
    setCriteria('')

    setCountries(
      countries
        .filter(country => (
          country === value
        ))
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <Filter
          value={criteria}
          onChangeHandler={handleFilter}
        />
      </header>

      <main>
        <Countries
          countries={countries}
          show={criteria}
          onClickHandler={handleClick}
        />

      </main>
    </div>
  )
}

export default App;
