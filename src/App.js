import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [resource, setResource] = useState('people');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/${resource}/`);
        const json = await response.json();
        setData(json.results.map(item => item.name));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [resource]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = resource => {
    setResource(resource);
    setInputValue('');
  };

  const handleSearch = async () => {
    if (!inputValue) return;
    if (isNaN(inputValue)) {
      setError('Error: Please enter a valid integer');
      return;
    }
    try {
      const response = await fetch(`https://swapi.dev/api/${resource}/${inputValue}`);
      const json = await response.json();
      setData([json.name]);
    } catch (error) {
      setError(`Could not find ${resource} with id ${inputValue}`);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <h1>Star Wars API</h1>
      <div>
        <button onClick={() => handleButtonClick('people')}>People</button>
        <button onClick={() => handleButtonClick('planets')}>Planets</button>
        <button onClick={() => handleButtonClick('starships')}>Starships</button>
        {resource === 'people' && (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter a number"
          />
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
