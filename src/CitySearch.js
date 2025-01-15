import React, { useState } from 'react';

const CitySearch = ({ getAirQuality }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      alert('Please enter a valid city name.');
      return;
    }
    const formattedCity = encodeURIComponent(inputValue); // Ensure valid city name
    getAirQuality(formattedCity);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Enter city..."
        onChange={handleInputChange}
        className="form-control"
        value={inputValue}
      />
      <button type="submit" className="btn btn-primary mt-3">
        Search
      </button>
    </form>
  );
};

export default CitySearch;
