import React, { useState, useEffect } from "react";
import Countries from "./Countries";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState({ continent: "", subregion: "" });
  const [sortOption, setSortOption] = useState("");
  const [top10, setTop10] = useState("");

  // Fetch data from REST Countries API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  // Apply filters and sorting
  const applyFilters = () => {
    let filtered = [...countries];

    if (filter.continent) {
      filtered = filtered.filter((c) => c.continents?.includes(filter.continent));
    }

    if (filter.subregion) {
      filtered = filtered.filter((c) => c.subregion === filter.subregion);
    }

    if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    if (top10) {
      filtered = filtered
        .sort((a, b) => (top10 === "population" ? b.population - a.population : b.area - a.area))
        .slice(0, 10);
    }

    setFilteredCountries(filtered);
  };

  useEffect(applyFilters, [filter, sortOption, top10, countries]);

  const handleFilterChange = (type, value) => {
    setFilter((prev) => ({
      continent: type === "continent" ? value : "",
      subregion: type === "subregion" ? value : "",
    }));
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
        <div>
          <input
            type="checkbox"
            checked={sortOption === "alphabetical"}
            onChange={() => setSortOption("alphabetical")}
          />
          <label>Alpha</label>
        </div>
        <div>
          <label>Top 10</label>
          <div>
            <input
              type="checkbox"
              checked={top10 === "population"}
              onChange={() => setTop10("population")}
            />
            <label>by population</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={top10 === "area"}
              onChange={() => setTop10("area")}
            />
            <label>by area</label>
          </div>
        </div>
        <div>
          <label>By continent</label>
          <select
            value={filter.continent}
            onChange={(e) => handleFilterChange("continent", e.target.value)}
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Australia">Australia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
          </select>
        </div>
        <div>
          <label>By subregion</label>
          <select
            value={filter.subregion}
            onChange={(e) => handleFilterChange("subregion", e.target.value)}
          >
            <option value="">Choose region</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Western Europe">Western Europe</option>
            <option value="Western Africa">Western Africa</option>
            <option value="Central Europe">Central Europe</option>
            <option value="Eastern Asia">Eastern Asia</option>
            <option value="Polynesia">Polynesia</option>
            <option value="Northern Africa">Northern Africa</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="South-Eastern Africa">South-Eastern Africa</option>
            <option value="Eastern Africa">Eastern Africa</option>
            <option value="Southern Africa">Southern Africa</option>
            <option value="North America">North America</option>
            <option value="Middle Africa">Middle Africa</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Southeast Europe">Southeast Europe</option>
            <option value="Western Asia">Western Asia</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Melanesia">Melanesia</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="South America">South America</option>
            <option value="Australia and New Zealand">Australia and New Zealand</option>
            <option value="Central America">Central America</option>
            <option value="Eastern Europe">Eastern Europe</option>
          </select>
        </div>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default Home;
