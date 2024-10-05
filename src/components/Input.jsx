import {React , useState, useEffect}from 'react'
import axios from 'axios';

import { MdLocationOn } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaBeer } from 'react-icons/fa';
import {
  clear,
  cloud,mist,notFound,rain,snow
} from '../assets/index';


const api_key = process.env.VITE_API_KEY;
export const Input = () => {
 
  const [location , setLocation] = useState('');
  const [weatherData, setWeatherData] =useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`

  useEffect(() => {
    setWeatherData({
      "coord": {
          "lon": 8.2588,
          "lat": 47.6957
      },
      "weather": [
          {
              "id": 804,
              "main": "Clouds",
              "description": "overcast clouds",
              "icon": "04n"
          }
      ],
      "base": "stations",
      "main": {
          "temp": 8.07,
          "feels_like": 7.08,
          "temp_min": 6.9,
          "temp_max": 9.03,
          "pressure": 1018,
          "humidity": 91,
          "sea_level": 1018,
          "grnd_level": 939
      },
      "visibility": 10000,
      "wind": {
          "speed": 1.85,
          "deg": 27,
          "gust": 4.49
      },
      "clouds": {
          "all": 100
      },
      "dt": 1728067678,
      "sys": {
          "type": 2,
          "id": 2037959,
          "country": "DE",
          "sunrise": 1728019822,
          "sunset": 1728061235
      },
      "timezone": 7200,
      "id": 3214112,
      "name": "Berau",
      "cod": 200
    })
  }, [])

  const submit = ()=> {
    // console.log(location)
    axios.get(url)
    .then((res) => {
      setWeatherData(res.data);
      console.log(res.data);
      
    })
    .catch(err => {
      console.log(err);
      
    })
      
  }
  const handleLocation= (e) => {
    setLocation(e.target.value);
  }


  return (
    <div className='w-screen h-screen bg-[#074153] flex justify-center items-center'>
    <div className="border p-5 w-[400px]  bg-white rounded-xl  ">
      <div className='flex items-center  justify-evenly'>

        < MdLocationOn 
        size="1.5rem"
        />
        <input 
        type="text" 
        placeholder='enter your location' className='focus:border-0 p-4' 
        onChange={handleLocation}/>

        <div 
        className='border rounded-full p-2 cursor-pointer bg-blue-300 hover:bg-[#0a5268]'
        onClick={() => submit()} >
          <IoSearch 
          size="1.5rem"
          />
        </div>

      </div>

      <div className='mt-4'>
        {weatherData != '' ? (
          <WeatherRes data={weatherData}/>
        ) 
        : null

        }
      </div>

      
    
    </div>
  
    
  </div>
  )

}

const WeatherRes = (props) => {
  const e = props.data;
  console.log(e);
  
  
  const Image = () => {
    let image ;
    switch(e.weather[0].main){
      case 'Clear':
        image = clear;
        break;

      case 'Rain':
          image = rain;
          break;

      case 'Snow':
          image = snow;
          break;

      case 'Clouds':
          image = cloud;
          break;

      case 'Haze':
          image = mist;
          break;

      default:
          image = notFound;
    }
    
    
    return(
      <img src={image} 
      alt=""
      srcset="" 
      className='w-[50%]'
      />
    )
    
    
  }
  return(
    <div className='flex border '>
      <div  className='flex flex-col items-center'>
        <Image />
        <h1 className='relative text-[#06283D] text-[4rem] mt-8 -ms-5'>{parseInt(e.main.temp)} 
          <span 
          className='absolute text-[1.5rem] font-extrabold ms-[4px] text-[#06283D]'
          
          >°C</span></h1>

          <p className='font-extrabold text-xl'>{e.weather[0].description}</p>
      </div>

    </div>
  )
}