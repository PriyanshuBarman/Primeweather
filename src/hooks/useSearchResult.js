import { useState, useEffect } from "react";

// In-memory cache (module-scoped, not persistent)
const cache = {};

export function useSearchResults(query) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Clear results if query is empty or less than 3 characters
    if (!query || query.length < 3) {
      if (searchResults.length !== 0) setSearchResults([]);
      if (isLoading) setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      // Check cache first
      if (cache[query]) return setSearchResults(cache[query]);

      setLoading(true);
      try {
        const results = await fetchSearchResults(query);
        cache[query] = results; // Store in cache
        setSearchResults(results);
      } catch (err) {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return { searchResults, isLoading };
}


const fetchSearchResults = async (query) => {
  const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEO_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();
  return data.features;
};
