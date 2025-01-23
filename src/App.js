import React, {useState} from 'react';
import CitySearch from './CitySearch';
import AirQualityCard from './AirQualityCard'
import PollutantInfo from './PollutantInfo';
import AirQualityLevelsTable from './AirQualityLevelsTable';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './Navbar';

function App() {
const [airQualityData, setAirQualityData] = useState(null)
const [error, setError] = useState(null)

  const getAirQuality = async (city) => {
    try {
       const response = await fetch(`https://api.waqi.info/feed/${city}/?token=28644e2f12c93d1b427b539c4907f9db1a8cae14`);

      // const response = await fetch(`https://api.waqi.info/feed/${city}/?token=your-api-key`);

      const data = await response.json();
      console.log(data);
      if(response.ok && data.status === 'ok') {
        setAirQualityData(data.data);
        setError(null);
      } else {
        setError("Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct.")
        setAirQualityData(null);
      }
    } catch (error) {
      console.error("network error:", error);
      setError('Sorry, something went wrong');
      setAirQualityData(null);
    }
  }
  return (
    <>
    <Navbar />
    <div className='container'>
    <h1 className='mt-5 mb-3'>Air Quality Index Checker</h1>
    <CitySearch getAirQuality={getAirQuality}/>
    {error && (
      <div className='alert alert-danger' role='alert'>
        {error}
      </div>
    )}
    {airQualityData && (
      <>
      <AirQualityCard data={airQualityData}/>
      <PollutantInfo pollutant={airQualityData.dominentpol}/>
      </>
    )}

    <AirQualityLevelsTable />
    
    </div>
    </>
  );
}

export default App;
