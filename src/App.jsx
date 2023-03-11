import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css'
import Loader from './UI/Loader';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [location, setLocation] = useState('Moscow');
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorM, setErrorM] = useState(true)
  const [img, setImg] = useState('')

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7620b17f35dfd2b0c5b20eeb9efd79c3&units=metric`)
    .then(response =>
      (response.status === 200 )
      ? (errorM && setErrorM(false), setData(response.data)) 
      : console.log()
      )
    .catch(() => stopError())
    
    axios.get(`https://api.unsplash.com/search/photos?pages=1&query=${location}&client_id=bxez53pkV7MCZOs8HxZzmV1u3mHFdyrsWYmFCoIN32o&`)
    .then(response => {setImg(response.data.results[2].urls.full);})
    .catch(() => stopErrorImg())
    .finally(()=>setLoading(false))
  }, [location, errorM]);

  const stopError = () =>{
    setErrorM(true);
    alert('we have a problem, page will be reload');
    window.location.reload();
    setLocation('moscow');
  }
  const submitInput = (event) =>{
    if (errorM === false) {
      event.preventDefault()    
      setLocation(inputValue)
      setLoading(true)
      setInputValue('')
    }
  }

  // на апи нет фоток родины, пришлось постараться
  const backGround = () => {
    const AppSuccess= {
      background: `url(${img}) no-repeat center center/cover`
    }
    const searchUstyug = {
      background: `url(https://sun9-53.userapi.com/impf/c622731/v622731001/45f5f/Jq9YSFgl7l8.jpg?size=1280x854&quality=96&sign=7fc19b1bc4b6506ac9e6c37997badf0e&type=album) no-repeat center center/cover`
    }
    if (data.name == 'Velikiy Ustyug') {
      return searchUstyug
    }
    else {
      return AppSuccess
    }
  }

  return (
    <div style={backGround()} >
      {!loading && !errorM
      ?
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
        <h1 className="h1-location">{data.name}</h1>
        <div className="cloud">
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='img-cloud'/>         
            {/* <h1 className="cloud-text">{data.clouds.all}</h1> */}
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
      : <Loader/>  
    }
    </div>
  )
}

export default App
