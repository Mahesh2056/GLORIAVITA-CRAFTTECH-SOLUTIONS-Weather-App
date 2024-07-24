import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a5b994b6562d35758aedd539416dff8b`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError('');
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Location not found');
          setLoading(false);
        });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main && data.main.feels_like !== undefined ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && data.main.humidity !== undefined ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && data.wind.speed !== undefined ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
