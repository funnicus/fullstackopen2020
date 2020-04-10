import React from 'react';
import Country from './Country';

const Countries = ({ countryList, countriesFiltered }) => {
    const c = countriesFiltered[0];
    return(
        <ul>
          {countryList.length === 1 ?  <Country name={c.name} capital={c.capital} population={c.population} languages={c.languages} flag={c.flag} /> : countryList}
        </ul>
    );
}

export default Countries;