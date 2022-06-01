import React from "react";
import "./index.css";

import { useState } from "react";
import { SEARCH_DATA } from "../../data/searchData";

const SearchBar = () => {
  const [searchText, setsearchText] = useState("");
  const [results, setresults] = useState([]);
  const [showLoader, setshowLoader] = useState(false);

  function capitalize(searchTerm) {
    const words = searchTerm.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0]?.toUpperCase() + words[i].substr(1);
    }
    const str = words.join(" ");
    return str;
  }

  function getResFromLocalData(query) {
    const resultToShow = SEARCH_DATA.filter((item) =>
      item.name.official.includes(capitalize(query))
    );
    setresults(resultToShow);
    // console.log(results);
  }

  function handleInputText(e) {
    setsearchText(e.target.value);
    setresults([]);
    if (e.target.value !== "") {
      setshowLoader(true);
      // getResFromLocalData(e.target.value);
      getResFromAPI(e.target.value); 
    }

  }

  const getResFromAPI = async (query) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${capitalize(query)}`
    );
    const data = await response.json();
    setresults(data);
    setshowLoader(false);
    console.log(results);
  };

  return (
    <>
      <div className="title">
        <p>SearchBar</p>
      </div>
      <div className="search-bar">
        <input
          className="input-text"
          value={searchText}
          onChange={handleInputText}
        />

        <div className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </div>
        {results.length > 0 && (
          <div className="results">
            <div className="suggestions">
              {results.map((item) => (
                <p>{item.name.official}</p>
              ))}
            </div>
          </div>
        )}

        {  (showLoader) && (<div className="results">
            <div className="suggestions">
                <div className="skeleton skeleton-text"></div>
            </div>
          </div>)
        }

        {  ((results.status === 404) && !showLoader) && (<div className="results">
            <div className="suggestions">
               <p>No results found</p>
            </div>
          </div>)
        }
      </div>
    </>
  );
};

export default SearchBar;
