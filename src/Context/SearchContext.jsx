import React, { createContext, useContext, useState, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "searchHistory",
    [],
  );

  const openSearchPage = () => setIsSearchPageOpen(true);
  const closeSearchPage = () => setIsSearchPageOpen(false);

  const clearAllHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  const clearHistoryItem = useCallback(
    (city) => {
      const updatedHistory = searchHistory.filter((i) => i.city !== city);
      setSearchHistory(updatedHistory);
    },
    [searchHistory, setSearchHistory],
  );

  const addToSearchHistory = useCallback(
    (city, lat = null, lon = null) => {
      if (city) {
        const cityExists = searchHistory.some((entry) => entry.city === city);

        if (!cityExists) {
          const newEntry = lat && lon ? { city, lat, lon } : { city };
          const updatedHistory = [newEntry, ...searchHistory];
          setSearchHistory(updatedHistory);
        }
      }
    },
    [searchHistory, setSearchHistory],
  );

  return (
    <SearchContext.Provider
      value={{
        openSearchPage,
        closeSearchPage,
        clearHistoryItem,
        clearAllHistory,
        isSearchPageOpen,
        searchHistory,
        suggestions,
        addToSearchHistory,
        setIsSearchPageOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
