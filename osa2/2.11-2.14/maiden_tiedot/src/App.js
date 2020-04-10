import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [ countries, setCountries] = useState([]);
  const [ filter, setFilter ] = useState('');

  const handleFilterChange = e => setFilter(e.target.value);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => setCountries(res.data))
  }, [])

  let countriesFiltered = countries.filter(p => p.name.toUpperCase().indexOf(filter.toUpperCase()) > -1);
  let countryList = countriesFiltered.map(p => <li key={p.name}>{p.name} {p.number}<button onClick={() => setFilter(p.name)}>show</button></li>);

  return (
    <div>
      <h2>Find countries</h2>
        <Filter value={filter} handleFilterChange={handleFilterChange}/>
      <h2>Countries</h2>
        {countryList.length > 10 ? <p>Too many matches...</p> : <Countries countryList={countryList} countriesFiltered={countriesFiltered} />}
    </div>
  )

}

export default App
