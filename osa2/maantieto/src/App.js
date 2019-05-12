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

const CountryDetails = ( {country} ) => {
  const languages = country.languages

  return (
    <div>
      <h2>{country.name}</h2>
      <br />
      <p>Capital <span>{country.capital}</span></p>
      <p>Population <span>{country.population}</span></p>

      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}        
      </ul>
      <img src={country.flag} alt="Lippu" width="128" height="128" />
    </div>
  )
}

const Country = ( {value} ) => {
  return (
    <p>{value.name}</p>
  )
}

const Countries = ( { countries, show} ) => {
  countries = countries
    .filter(country => country.name.toLowerCase().includes(show))
    

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


  return (
    <div className="App">
      <header className="App-header">
        <Filter
          value={criteria}
          onChangeHandler={handleFilter}
        />
      </header>

      <aside>
        <Countries
          countries={countries}
          show={criteria}
        />

      </aside>
    </div>
  )
}

export default App;
