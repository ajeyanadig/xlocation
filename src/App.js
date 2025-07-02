import { useState, useEffect } from "react";
//https://crio-location-selector.onrender.com/countries
//https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states
//https://crio-location-selector.onrender.com/country=%7BcountryName%7D/state=%7BstateName%7D/cities
import "./App.css";

function App() {
  let [countries, setCountries] = useState([]);
  let [states, setStates] = useState([]);
  let [cities, setCities] = useState([]);
  let [selectedcountry, setSelectedCountry] = useState([]);
  let [selectedstate, setSelectedState] = useState([]);
  let [selectedcity, setSelectedCity] = useState([]);
  let [resString, setResString] = useState("");

  useEffect(() => {
    const rawData = fetch(
      "https://crio-location-selector.onrender.com/countries"
    )
      .then((data) => data.json())
      .then((jsonData) => {
        setCountries(jsonData);
      })
      .catch((e) => console.error(e));
  }, []);

  function handleCountryChange(e) {
    //api https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states
    fetch(
      `https://crio-location-selector.onrender.com/country=${e.target.value}/states`
    )
      .then((data) => data.json())
      .then((jsonData) => {
        setStates(jsonData);
        console.log(jsonData);
      })
      .catch((e) => console.error(e));
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  }
  function handleStateChange(e) {
    //api https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedcountry}/state=${e.target.value}/cities`
    )
      .then((data) => data.json())
      .then((jsonData) => {
        setCities(jsonData);
        console.log(jsonData);
      })
      .catch((e) => console.error(e));
    setSelectedState(e.target.value);
    setSelectedCity("");
  }

  function handleCityChange(e) {
    //api https://crio-location-selector.onrender.com/country=%7BcountryName%7D/states

    setSelectedCity(e.target.value);
    setResString(
      `You selected ${e.target.value}, ${selectedstate}, ${selectedcountry}`
    );
  }

  return (
    <div className="App">
      <h1>Select Location</h1>
      <form>
        <span>
          {" "}
          <select onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
        </span>

        <span>
          <select onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
        </span>

        <span>
          <select onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
          </select>
        </span>
      </form>
      <h3 style={{ textAlign: "center" }}>{resString}</h3>
    </div>
  );
}

export default App;
