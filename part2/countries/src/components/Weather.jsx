const Weather = ({ info, weather }) => {
  if (info === null || weather === null) {
    return null;
  }
  const firstDigit = weather.weather[0].id.toString()[0];
  let code = null;
  switch (Number(firstDigit)) {
    case 2:
      code = "11d";
      break;
    case 3:
      code = "09d";
      break;
    case 5:
      code = "10d";
      break;
    case 6:
      code = "13d";
      break;
    case 7:
      code = "50d";
      break;
    case 8:
      code = "01d";
      break;
    default:
      console.log("No matching weather icon");
  }
  return (
    <div>
      <h2> Weather in {info.capital}</h2>
      <div> Temperature {weather.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${code}@2x.png`}></img>
      <div> Wind {weather.wind.speed} m/s</div>
    </div>
  );
};
export default Weather;
