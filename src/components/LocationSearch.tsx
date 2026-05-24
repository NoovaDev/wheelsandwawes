import { useState } from "react";
import axios from "axios";

type LocationSearchProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

type PhotonFeature = {
  properties: {
    name?: string;
    city?: string;
    state?: string;
    country?: string;
    countrycode?: string;
  };
};

const LocationSearch = ({
  placeholder,
  value,
  onChange,
  readOnly = false,
}: LocationSearchProps) => {
  const [results, setResults] = useState<PhotonFeature[]>([]);

  const searchLocation = async (query: string) => {
    onChange(query);

    if (readOnly || query.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(
          query
        )}&limit=5&lang=en`
      );

      const features: PhotonFeature[] = res.data.features || [];

      const sriLankaResults = features.filter(
        (item) =>
          item.properties.countrycode === "LK" ||
          item.properties.country === "Sri Lanka"
      );

      setResults(sriLankaResults);
    } catch (error) {
      console.log("LOCATION SEARCH ERROR:", error);
      setResults([]);
    }
  };

  const selectLocation = (place: PhotonFeature) => {
    const parts = [
      place.properties.name,
      place.properties.city,
      place.properties.state,
      place.properties.country,
    ].filter(Boolean);

    onChange(parts.join(", "));
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

      {results.length > 0 && !readOnly && (
        <div className="location-results">
          {results.map((item, index) => (
            <button
              type="button"
              key={index}
              className="location-result-item"
              onClick={() => selectLocation(item)}
            >
              {[
                item.properties.name,
                item.properties.city,
                item.properties.state,
                item.properties.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;