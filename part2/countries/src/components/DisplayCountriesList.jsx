const DisplayCountriesList = ({ input, getCountryInfo }) => {
  if (input[0] === "Too many matches, specify another filter") {
    return <div>{input[0]}</div>;
  } else if (input.length < 10 && input.length > 1) {
    return (
      <div>
        {input.map((el) => (
          <div key={el}> 
          {el} <button onClick={() => getCountryInfo(el)}>Show</button>
           </div>
        ))}
      </div>
    );
  }
};
export default DisplayCountriesList;
