import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [currency, setCurrency] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/currency/${currency}`
      );
      setCountries(response.data);
    } catch (error) {
      setError("Failed to fetch countries");
      setCountries([]);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setCurrency(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCountries();
  };

  return (
    <div>
      <div className="searchBackground">
        <form onSubmit={handleSubmit}>
          <input
            className="searchBox"
            type="text"
            value={currency}
            onChange={handleSearchChange}
            placeholder="Search By Currency INR, EUR, USD, CNY"
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
      {loading && <p> loading..</p>}
      {error && <p>{error}</p>}
      <div>
        <>
          {countries.map((country) => (
            <div className="card card-align" style={{ width: "18rem" }}>
              <div className="card-body" key={country.cca2}>
                <img
                  src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
                  alt={`Flag of ${country.name.common}`}
                />
                <h3>Name: {country.name.common}</h3>
                <div>Capital: {country.capital}</div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default App;
