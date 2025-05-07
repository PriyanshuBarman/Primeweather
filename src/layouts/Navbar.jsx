import React, { memo } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useApiData } from "../context/ApiContext";
import { useTheme } from "../context/ThemeContext";
import DesktopSearch from "./search/DesktopSearch";

const Navbar = () => {
  const { city, cityDescription, isLoading } = useApiData();
  const { toggleTheme, currentTheme } = useTheme();
  const isDeskTop = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

  return (
    <nav className="fixed right-0 top-0 z-20 flex h-10 w-full items-center justify-center gap-1 bg-gradient-to-b from-[#f5f5f5] via-[#f5f5f5] to-transparent pb-1 pt-0 font-oxanium text-black/90 shadow-[inset_1px_-.4px_2px_0px_ttt] dark:bg-transparent dark:bg-none dark:to-[#242424] dark:text-white dark:backdrop-blur-2xl md:h-12 md:justify-normal md:gap-0 md:from-white md:via-white md:to-white md:pt-2.5 md:shadow-sm md:shadow-black/10 md:backdrop-blur-2xl">
      <div
        className={`location flex h-full w-[60%] flex-col items-center justify-start pt-2 md:fixed md:left-[0%] md:flex-row md:pt-0 ${isLoading ? "invisible" : "visible"}`}
      >
        <div
          onClick={() => {
            !isDeskTop && navigate("/search");
          }}
          className={`location-title flex w-full items-center justify-center gap-1 text-center text-lg font-semibold capitalize leading-5 md:gap-1 md:italic ${isLoading ? "-translate-y-10 opacity-0" : "translate-y-0 opacity-100 transition-all duration-[600ms]"}`}
        >
          {isDeskTop && <h5 className="text-xl not-italic">Location - </h5>}
          <MdLocationOn className="location-icon mb-1 min-h-6 min-w-[1.20rem] md:ml-4" />
          {city}
          <span className="absolute top-9 flex h-full w-[70%] justify-center text-wrap text-center text-xs md:relative md:top-0 md:ml-7 md:w-96 md:justify-start md:text-sm">
            {cityDescription}
          </span>
        </div>
      </div>

      {isDeskTop && <DesktopSearch />}

      {/* Theme Change Button */}
      <button
        onClick={() => toggleTheme()}
        className="theme-toggle absolute right-2 top-2 z-40 flex size-8 items-center justify-center rounded-full p-1 shadow shadow-black/30 dark:bg-[#434242] dark:text-white md:right-[4%] md:top-3 md:size-8 md:rounded-full"
      >
        {currentTheme === "light" ? (
          <IoMdMoon className="theme-icon-sun size-5 transition-transform duration-700 ease-out md:size-[1.15rem]" />
        ) : (
          <PiSunDimFill className="theme-icon-sun size-5 transition-transform duration-700 ease-out md:size-[1.15rem]" />
        )}
      </button>
    </nav>
  );
};

export default memo(Navbar);
