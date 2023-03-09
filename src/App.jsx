import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const photoApiKey ="lhtVXNlEc6eAhfcnbwZm22xTKq61PkT9SI14-z4fIj0";

  const [inputValue, setInputValue] = useState('');
  const [location, setLocation] = useState('Saint Petersburg');
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorM, setErrorM] = useState(true)
  const [img, setImg] = useState('')

  useEffect(() => {
    axios.get(`https://api.unsplash.com/search/photos?pages=1&query=${location}&client_id=bxez53pkV7MCZOs8HxZzmV1u3mHFdyrsWYmFCoIN32o&`)
    .then(response => setImg(response.data.results[2].urls.full))
  }, [location])
  
  console.log(img)
  console.log(data)
  console.log(location)

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7620b17f35dfd2b0c5b20eeb9efd79c3&units=metric`)
    .then(response =>
      (response.status === 200 )
      ? (errorM && setErrorM(false), setData(response.data)) 
      : console.log()
      )
    .catch(() => setErrorM(true))
    .finally(()=>setLoading(false))
  }, [location, errorM]);

  const submitInput = (event) =>{
    if (errorM === false) {
      event.preventDefault()    
      setLocation(inputValue.charAt().toUpperCase()+inputValue.slice(1))
      setInputValue('')
      console.log
    }
    else {
      alert('error')
    }
  }
  return (
    <div className="App" style={{ background: `url(${img}) no-repeat center center/cover`}}>
      {!loading && 
        <div className="App-main">
        <form 
          onSubmit={(event) => submitInput(event)}>
          <input className='input-location'
            type={'text'} 
            placeholder={'Search location...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <h1 className="h1-location">{location}</h1>
        <div className="cloud">
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='img-cloud'/>         

            <h1 className="cloud-text">{data.clouds.all}</h1>

        </div>
        <div className="box-container">
          <div className="box">
            <p>Humidity</p>

            <h1>{data.main.humidity.toFixed()}</h1>

          </div>
          <div className="box">
            <p>Wind</p>

              <h1>{data.wind.speed.toFixed()} km/h</h1>

          </div>
          <div className="box">
            <p>Temperature</p>

            <h1>{data.main.temp.toFixed()} °C</h1>
          </div>
        </div>
      </div>
      }
     
    </div>
  )
}

export default App
