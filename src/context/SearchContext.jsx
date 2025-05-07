import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const searchBarRef = useRef(null);
  const [searchHistory, setSearchHistory] = useLocalStorage("searchHistory",[]); // prettier-ignore

  const clearAllHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

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
        searchBarRef,
        clearAllHistory,
        searchHistory,
        addToSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
