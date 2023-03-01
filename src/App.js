import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [commodity, setCommodity] = useState('WHEAT');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://commodities-api.com/api/latest?access_key=rvf3vmik5goucyb1i5rcussj9emu4i6l07mwk019j2w1yv46xtq0uuem6mfg`);
        const json = await response.json();
        setPrice(json.rates[commodity]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [commodity]);

  const handleButtonClick = (e) => {
    const newCommodity = e.target.innerText;
    setCommodity(newCommodity);
  };

  const handleInputChange = (e) => {
    const newCommodity = e.target.value;
    setCommodity(newCommodity.toUpperCase());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Commodities API Demo</h1>
        <div>
          <button onClick={handleButtonClick}>WHEAT</button>
          <button onClick={handleButtonClick}>SUGAR</button>
          <button onClick={handleButtonClick}>COFFEE</button>
        </div>
        <div>
          <label>Enter a commodity name:</label>
          <input type="text" onChange={handleInputChange} />
          <p>Try these: https://commodities-api.com/symbols</p>
        </div>
        {error ? (
          <p>{error}</p>
        ) : price !== null ? (
          <p>
            {commodity}: {price}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;