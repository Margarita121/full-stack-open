const CountryInfo = ({ info }) => {
  if (info === null) {
    return null;
  }
  return (
    <div>
      <h1> {info.name.common}</h1>
      <div> Capital {info.capital}</div>
      <div> Area {info.area}</div>
      <h2> Languages </h2>
      <ul>
        {Object.values(info.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={info.flags.png} alt={info.flags.alt}></img>
    </div>
  );
};
export default CountryInfo;
