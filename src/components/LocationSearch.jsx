import { useState } from "react";
import axios from "axios";

const LocationSearch = ({
  placeholder,
  value,
  onChange,
  readOnly = false,
}) => {
  const [results, setResults] = useState([]);

  const searchLocation = async (query) => {
    onChange(query);

    if (query.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://photon.komoot.io/api/?q=${query}&limit=5`
      );

      setResults(res.data.features || []);
    } catch (error) {
      console.log(error);
    }
  };

  const selectLocation = (place) => {
    const name = place.properties.name || "";
    const city = place.properties.city || "";
    const country = place.properties.country || "";

    const fullAddress = `${name}, ${city}, ${country}`;

    onChange(fullAddress);
    setResults([]);
  };

  return (
    <div className="location-search-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={(e) => searchLocation(e.target.value)}
        required
      />

      {results.length > 0 && (
        <div className="location-results">
          {results.map((item, index) => (
            <div
              key={index}
              className="location-result-item"
              onClick={() => selectLocation(item)}
            >
              {item.properties.name}
              {item.properties.city
                ? `, ${item.properties.city}`
                : ""}
              {item.properties.country
                ? `, ${item.properties.country}`
                : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;