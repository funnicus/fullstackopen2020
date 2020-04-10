import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ name, capital, population, languages, flag }) => {
    const [weatherdata, setWeatherdata] = useState({
        current: {
            temperature: undefined,
            weather_icons: [undefined],
            wind_speed: undefined,
            wind_dir: undefined
        }
    });
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${name}`)
        .then(res => {
            console.log(res);
            setWeatherdata(res.data)
        })
    }, [])

    const langs = languages.map(l => <li key={l.name} >{l.name}</li>);

    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h4>Languages</h4>
            <ul>
                {langs}
            </ul>
            <img src={flag} alt="Image not available"></img>
            <h3>Weather in {capital}</h3>
            <ul>
                <li>Temperature: {weatherdata.current.temperature}</li>
                <li><img src={weatherdata.current.weather_icons[0]} alt="Image not available"></img></li>
                <li>Wind: {weatherdata.current.wind_speed}mph {weatherdata.current.wind_dir}</li>
            </ul>
        </div>
    )
}

export default Country;