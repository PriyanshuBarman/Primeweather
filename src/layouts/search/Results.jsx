import React from "react";
import { PiCity } from "react-icons/pi";

function Results({ searchResults, handleResultClick, selectedIndex }) {
  if (!searchResults?.length) return;
  return (
    <ul className="Search-Results max-sm:text-black/80 max-sm:dark:text-white/80">
      {searchResults?.map((result, index) => (
        <li
          key={index}
          onMouseDown={() => handleResultClick(result)}
          className={`flex w-full cursor-pointer items-center gap-4 rounded-md px-4 py-2 hover:bg-black/5 dark:hover:bg-white/15 ${
            index === selectedIndex ? "bg-black/5 dark:bg-white/20" : ""
          }`}
        >
          <PiCity size={22} className="text-black/80 dark:text-white" />
          <div className="flex flex-col">
            <h5 className="text-sm font-[500]">
              {result.properties.address_line1}
            </h5>
            <span className="text-xs">{result.properties.address_line2}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Results;
