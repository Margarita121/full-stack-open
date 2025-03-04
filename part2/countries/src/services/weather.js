import axios from "axios";
const weatherUrl = " https://api.openweathermap.org/data/2.5/weather?";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const getWeatherInCapital = (countryInfo) => {
  const capitalLat = countryInfo.capitalInfo.latlng[0];
  const capitalLon = countryInfo.capitalInfo.latlng[1];
  const request = axios.get(
    `${weatherUrl}lat=${capitalLat}&lon=${capitalLon}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getWeatherInCapital };
