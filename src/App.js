import React, { useState } from 'react'
import "./App.css"

function App() {
  const [city, setCity] = useState("")
  const [validation, setValidation] = useState(false)
  const [valid, setValid] = useState(false)
  const [report, setReport] = useState({})
  const [history, setHistory] = useState([])
  // if(city.length===0){
  //   setValidation(false)
  // }
  const handleWeatherReport=()=>{
    // let capitalize = ""
    // for(let i = 0; i < city.length; i++){
    //   if(i===0){
    //     capitalize+= city[i].toUpperCase()
    //   }
    //   else{
    //     capitalize+=city[i]
    //   }
    // }
    // setCity(capitalize)
    // capitalize = ""
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53dbeaaa9f0ef7dccb48afe456f2acbc`)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.cod !==200){
        setValidation(true)
        setValid(false)
      }
      else{
        setHistory((old)=>[...old, city])
        setValidation(false)
        setValid(true)
        setReport(data.main)
        
      }
    }).catch((e)=>{
      console.log(e)
    })
    // 50a7aa80fa492fa92e874d23ad061374
  }
  return (
    <><div className="main-container">
          <div className="container">
        <h1>Weather App</h1>
        <div>
        <input type="text" placeholder="Enter City" onChange={(e)=>{
          setCity(e.target.value)
        }}/><button onClick={handleWeatherReport} >Search</button>
        </div>
        
        {(city.length && validation)?<h1 className='invalid'>Enter Valid City Name</h1>:""}
        {city.length&&valid?(
          <div className='display-report'>
            <p style={{width:"70%", background:"white",textAlign:"center"}}>Weather Details of City: <b>{city}</b></p>
            <p>Current Temparature: <b>{(report.temp-273).toFixed(2)} <sup>o</sup>C</b> </p>
            <p>Temparature Range: <b>{(report.temp_max-273).toFixed(2)} <sup>o</sup>C to {(report.temp_min-273).toFixed(2)} <sup>o</sup>C</b> </p>
            <p>Humidity: <b>{report.humidity}</b> </p>
            <p>Sea Level: <b>{report.sea_level}</b></p>
            <p>Ground Level: <b>{report.grnd_level}</b></p>
          </div> 
        ):(<div className='history'>
        {history.length?<h1>Last {history.length} city entries</h1>:""}
        {history.map((val, i)=>{
          return(
            <p key={i}>{val}</p>
          )
        })}
      </div>)}
      </div>
    </div>
      
    </>
  );
}

export default App;
