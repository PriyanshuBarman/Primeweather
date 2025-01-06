import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { useApiData } from "../Context/ApiContext";
import { useSearch } from "../Context/SearchContext";

const SearchBar = () => {
  const { search } = useApiData();
  const { addToSearchHistory, isSearchPageOpen, closeSearchPage } = useSearch();

  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isDeskTop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isSearchPageOpen && inputRef.current) {
      const timeoutId = setTimeout(() => {
        inputRef.current.focus();
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isSearchPageOpen]);

  const handleSubmit = (e, city) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity || trimmedCity.length < 3) {
      setError("Enter a valid city name");
      setInput("");
      return;
    }
    setError("");
    search(trimmedCity);
    setSearchResults([]);
    setShowSearchResults(false);
    inputRef.current.blur();
    setInput("");
    if (!isDeskTop) {
      closeSearchPage();
      addToSearchHistory(trimmedCity);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setError("");

    const trimmedValue = value.trim();

    if (trimmedValue.length > 2) {
      if (!showSearchResults) setShowSearchResults(true);
      fetchSearchResults(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const fetchSearchResults = async (query) => {
    const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;

    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEO_API_KEY}`,
      );
      const data = await response.json();
      setSearchResults(data.features);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result) => {
    const { lat, lon, address_line1 } = result.properties;
    const selectedName = address_line1;
    search(lat, lon);

    addToSearchHistory(selectedName, lat, lon);

    setSearchResults([]);
    setInput("");
    setShowSearchResults(false);
    inputRef.current.blur();
    closeSearchPage();
  };

  return (
    <div className="hover-scale-2 w-full md:fixed md:right-[19%] md:mb-12 md:w-[30%]">
      <form
        className="ml-2 mt-10 flex h-9 w-full items-center justify-center gap-2 md:ml-0 md:h-8"
        onSubmit={(e) => handleSubmit(e, input)}
      >
        <input
          type="text"
          className={`h-full w-[75%] rounded-full px-5 text-sm italic text-black shadow-[-0px_-0px_1px_.7px] shadow-black/40 outline-none dark:bg-black/5 dark:text-white dark:shadow-white/55 ${error ? "placeholder-red-400" : "placeholder-black/80 dark:placeholder-white/85"}`}
          placeholder={error || "Search City Name"}
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button className="right-2 flex size-9 items-center justify-center rounded-full bg-black/85 text-white shadow-md dark:bg-white/15 dark:text-white/70 md:size-10">
          <IoMdSearch className="size-6" />
        </button>
      </form>

      {/* Search Results List */}
      {showSearchResults && (
        <ul className="absolute left-1/2 z-30 mt-2 w-[85%] -translate-x-1/2 rounded-lg bg-white shadow-lg dark:bg-black">
          {loading && (
            <div className="absolute w-full items-center justify-center space-y-4 rounded-lg bg-inherit px-4 pt-3 shadow-lg">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col items-start justify-center gap-1 bg-inherit"
                >
                  <div className="h-3 w-60 rounded bg-black/20 dark:bg-white/15"></div>
                  <div className="h-2 w-20 rounded bg-black/20 dark:bg-white/15"></div>
                </div>
              ))}
            </div>
          )}

          {searchResults.length > 0 &&
            searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleResultClick(result)}
                className="flex w-full cursor-pointer flex-col px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span className="font-[500]">
                  {result.properties.address_line1}
                </span>
                <span className="text-xs">
                  {result.properties.address_line2}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
