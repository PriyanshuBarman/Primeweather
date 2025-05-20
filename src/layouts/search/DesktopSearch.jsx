import React, { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useApiData } from "../../context/ApiContext";
import { useSearch } from "../../context/SearchContext";
import { useSearchResults } from "../../hooks/useSearchResult";
import GeoLocationBtn from "./GeoLocationBtn";
import History from "./History";
import Results from "./Results";
import ReactGA from "react-ga4";

const DesktopSearch = () => {
  const { search } = useApiData();
  const { addToSearchHistory, searchHistory, clearAllHistory, searchBarRef } =
    useSearch();
  const [query, setQuery] = useState("");
  const { searchResults, isLoading } = useSearchResults(query);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults?.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      closeAll();
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleResultClick(searchResults?.[selectedIndex]);
      } else {
        handleSubmit(query);
      }
    }
  };

  const closeAll = useCallback(() => {
    setIsPopoverOpen(false);
    setSelectedIndex(-1);
    searchBarRef.current.blur();
    setQuery("");
  }, [setIsPopoverOpen]);

  const handleSubmit = useCallback(
    (cityName = null) => {
      const trimmedCity = cityName.trim();
      if (!trimmedCity || trimmedCity.length < 3)
        return toast.warning("Enter a valid city name");
      search(trimmedCity);
      closeAll();
      addToSearchHistory(trimmedCity);

      ReactGA.event({
        category: "Query",
        action: "Search Query",
        label: query,
      });
    },

    [search, closeAll, addToSearchHistory],
  );

  const handleResultClick = useCallback(
    (result) => {
      const { lat, lon, address_line1 } = result.properties;
      const selectedName = address_line1;
      search(lat, lon);
      closeAll();
      addToSearchHistory(selectedName, lat, lon);
    },
    [search, closeAll, addToSearchHistory],
  );

  return (
    <>
      <div className="fixed right-[8%] z-50 flex gap-4">
        <div className="DesktopSearch flex w-[450px] items-center gap-4 rounded-lg border bg-white pl-12 pr-4 focus-within:ring-1 focus-within:ring-black/50 dark:bg-[#363636] focus-within:dark:bg-black">
          <CiSearch
            size={20}
            className="absolute left-4 text-black/80 dark:text-white/80"
          />
          <input
            ref={searchBarRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsPopoverOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="search ... "
            className="w-full bg-inherit outline-none"
          />
          <button
            type="button"
            disabled={isLoading}
            className={`Clear-Btn ${!query.length && "hidden"}`}
            onClick={() => {
              setQuery("");
              searchBarRef.current.focus();
            }}
          >
            {isLoading ? <Spinner /> : <IoMdClose />}
          </button>
        </div>
        <GeoLocationBtn closeAll={closeAll} />
        {isPopoverOpen && (
          <div className="absolute z-50 max-h-[600px] min-h-80 min-w-[450px] translate-y-10 overflow-y-auto rounded-xl bg-white p-4 shadow-lg dark:bg-black">
            <Results {...{ searchResults, handleResultClick, selectedIndex }} />
            {!isLoading && !searchResults?.length && (
              <History
                {...{
                  handleSubmit,
                  searchHistory,
                  selectedIndex,
                  clearAllHistory,
                }}
              />
            )}
            {!searchResults?.length && !isLoading && !searchHistory?.length && (
              <h2 className="w-full text-center">
                Type something to get started
              </h2>
            )}
          </div>
        )}
      </div>
      {isPopoverOpen && (
        <div
          onClick={() => setIsPopoverOpen(false)}
          className="Layout fixed inset-0 z-30 h-dvh w-dvw bg-black/20 dark:bg-white/10"
        ></div>
      )}
    </>
  );
};

export default DesktopSearch;
