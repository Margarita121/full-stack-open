import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [inputCountry, setInputCountry] = useState("");
  const [display, setDisplay] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
  var countriesMatchingFilter = [];

  const titleCase = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

  useEffect(() => {
    if (countryInfo) {
      console.log("EFFECT RUN - One country selected");
      setCountryInfo(countryInfo);
    }
  }, [inputCountry]);

  const getCountryInfo = (inputCountry) => {
    countriesService.getCountryByName(titleCase(inputCountry)).then((info) => {
      setCountryInfo(info);
      return info;
    });
  };

  const displayCountries = (input) => {
    if (input.length > 10) {
      setDisplay(["Too many matches, specify another filter"]);
      setCountryInfo(null);
    } else if (input.length === 1) {
      setDisplay([""]);
      getCountryInfo(input[0]);
    } else {
      setDisplay(input);
      setCountryInfo(null);
    }
  };

  const filterCountries = (inputCountry) => {
    countriesService.getAll().then((allCountryInfo) => {
      const allNames = allCountryInfo.map((el) => el.name.common);
      countriesMatchingFilter = allNames.filter((name) =>
        name.toLowerCase().includes(inputCountry.toLowerCase())
      );
      console.log("FILTER - countries matching filter");
      console.log(countriesMatchingFilter);
      displayCountries(countriesMatchingFilter);
    });
  };

  const handleCountryChange = (event) => {
    setInputCountry(event.target.value);
    filterCountries(event.target.value);
  };

  return (
    <div>
      <form>
        find countries{" "}
        <input value={inputCountry} onChange={handleCountryChange} />
      </form>
      {display.map((el) => (
        <div key={el}> {el} </div>
      ))}
      <CountryInfo info={countryInfo} />
    </div>
  );
};

export default App;
