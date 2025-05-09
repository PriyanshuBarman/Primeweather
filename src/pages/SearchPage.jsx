import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import Spinner from "../components/Spinner";
import { useApiData } from "../context/ApiContext";
import { useSearch } from "../context/SearchContext";
import { useSearchResults } from "../hooks/useSearchResult";
import GeoLocationBtn from "../layouts/search/GeoLocationBtn";
import History from "../layouts/search/History";
import Results from "../layouts/search/Results";
import { useCallback } from "react";

const SearchPage = () => {
  const { search } = useApiData();
  const { searchHistory, clearAllHistory, addToSearchHistory } = useSearch();

  const [query, setQuery] = useState("");
  const { searchResults, isLoading } = useSearchResults(query);

  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (cityName) => {
      const trimmedCity = cityName ?? query.trim();
      if (!trimmedCity || trimmedCity.length < 3)
        return toast.warning("Enter a valid city name");

      navigate(-1, { replace: true });
      search(trimmedCity);
      searchBarRef.current.blur();
      setQuery("");
      addToSearchHistory(trimmedCity);
    },
    [search, addToSearchHistory],
  );

  const handleResultClick = useCallback(
    (result) => {
      const { lat, lon, address_line1 } = result.properties;
      const selectedName = address_line1;
      search(lat, lon);
      navigate("/", { replace: true });
      searchBarRef.current.blur();
      addToSearchHistory(selectedName, lat, lon);
      setQuery("");
    },
    [search, addToSearchHistory],
  );
  return (
    <div className="fixed inset-0 z-40 h-full overflow-y-auto bg-white text-sm text-black dark:bg-[#1d1d1d] dark:text-white">
      <PageHeader name={"search"} />
      <div className="ml-2 mt-12 flex justify-center gap-2">
        {/* ============================ SearchBar ============================ */}
        <div className="SearchBar flex w-[75%] items-center rounded-lg border px-4 py-1.5">
          <CiSearch size={20} className="text-black/80 dark:text-white/80" />
          <input
            ref={searchBarRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="search ... "
            className="ml-2 w-full bg-inherit outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(query)}
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
        {/* ============================// SearchBar ============================ */}
        <GeoLocationBtn />
      </div>
      <br />
      <div className="px-5">
        <Results {...{ searchResults, handleResultClick }} />
        {!isLoading && !searchResults?.length && (
          <History
            {...{
              handleSubmit,
              searchHistory,
              clearAllHistory,
            }}
          />
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-8 left-1/2 right-1/2 size-11 -translate-x-1/2 rounded-full bg-black/80 p-3 text-white shadow active:shadow-none dark:bg-white/55 dark:text-black dark:shadow-black"
      >
        <RxCross1 className="h-full w-full" />
      </button>
    </div>
  );
};

export default SearchPage;
