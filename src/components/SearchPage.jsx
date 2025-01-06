import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useApiData } from "../Context/ApiContext";
import { useSearch } from "../Context/SearchContext";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  const {
    openSearchPage,
    closeSearchPage,
    isSearchPageOpen,
    searchHistory,
    clearHistoryItem,
    clearAllHistory,
    addToSearchHistory,
  } = useSearch();
  const { search } = useApiData();
  
  // To handle back btn click
  useEffect(() => {
    if (isSearchPageOpen) {
      window.history.pushState({ searchOpen: true }, "");
    }
    const handlePopState = (event) => {
      if (event.state && event.state.searchOpen) {
        closeSearchPage();
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isSearchPageOpen, openSearchPage]);

  const citySuggestions = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Moscow",
    "Berlin",
    "Mumbai",
    "Dubai",
    "Sydney",
  ];

  const handleHistoryClick = (history) => {
    const { lat, lon, city } = history;

    if (lat && lon) search(lat, lon);
    else if (city) search(city);
    closeSearchPage();
  };
  const handleSuggestClick = (cityName) => {
    search(cityName);
    addToSearchHistory(cityName);
    openSearchPage();
    closeSearchPage();
  };

  return (
    <div
      className={`fixed bottom-0 flex h-full w-full flex-col items-center bg-[#f9f9f9] pt-4 font-oxanium transition-all duration-200 ease-in-out dark:border-t dark:border-white/50 dark:bg-[#1e1e1e] dark:text-white md:w-[375px] ${
        isSearchPageOpen
          ? "z-50 translate-x-0 opacity-100"
          : "-z-10 translate-x-[20%] opacity-0"
      }`}
    >
      <PageHeader name={"Search"} />

      <SearchBar />

      <div className="mt-3 flex w-full flex-col items-center pb-28">
        {/* Recent Searches */}
        {searchHistory.length > 0 && (
          <div className="relative w-[80%]">
            <div className="sticky mb-3.5 flex w-full items-center justify-between bg-[#f9f9f9] pb-0.5 pt-3 dark:bg-[#1e1e1e]">
              <h1 className="text-sm font-[500] text-black/80 dark:text-white/80">
                Recent searches
              </h1>
              <button
                onClick={() => clearAllHistory()}
                className="flex items-center justify-center gap-1 rounded-full bg-gradient-to-br from-red-300 to-red-400 px-3 py-0.5 text-[.66rem] font-[500] italic text-white shadow-md hover:bg-red-500"
              >
                Clear All <RiDeleteBin6Line />
              </button>
            </div>
            <ul className="flex w-full cursor-pointer flex-wrap items-center justify-between gap-3 text-[0.83rem]">
              {searchHistory.map((item) => (
                <li
                  key={item.city}
                  className="flex items-center justify-between gap-0.5 rounded-lg bg-black/10 py-0.5 pl-3 shadow-md shadow-black/20 dark:bg-white/10 dark:shadow-black"
                >
                  <span onClick={() => handleHistoryClick(item)}>
                    {item.city}
                  </span>
                  <button
                    onClick={() => clearHistoryItem(item.city)}
                    className="px-2 text-xl leading-3"
                  >
                    <RiDeleteBin6Line className="size-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Search Suggestions */}
        <div className="mt-8 w-[80%]">
          <h1 className="text-sm font-[600] italic text-black/80 dark:text-white/80">
            Famous Cities
          </h1>
          <ul className="mt-4 flex w-full cursor-pointer flex-wrap items-center justify-between gap-y-4 text-center text-[0.85rem]">
            {citySuggestions.map((item) => (
              <li
                key={item}
                onClick={() => handleSuggestClick(item)}
                className="rounded-md bg-black/10 px-4 py-0.5 shadow-md shadow-black/20 transition duration-500 ease-in-out dark:bg-white/10 dark:shadow-black"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={closeSearchPage}
        className="absolute bottom-8 h-8 w-24 rounded-full bg-blue-400 p-1.5 text-white shadow-lg shadow-black/30 active:shadow-none dark:bg-white/55 dark:text-black dark:shadow-black"
      >
        <RxCross1 className="h-full w-full" />
      </button>
    </div>
  );
};

export default SearchPage;
