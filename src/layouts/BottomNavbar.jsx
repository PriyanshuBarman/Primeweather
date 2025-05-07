import { IoMdSearch } from "react-icons/io";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const BottomNavbar = () => {
  const { openSearchPage } = useSearch();
  return (
    <nav className="fixed bottom-3 left-1/2 z-10 flex h-[2.8rem] w-[88%] -translate-x-1/2 items-stretch justify-around rounded-3xl border-black/30 bg-white px-1 font-oxanium shadow-[_2px_3px_5px_0px] shadow-black/40 dark:border-white/20 dark:bg-[#1d1d1d] dark:shadow-black">
      <HomeTab />

      <NavLink
        to="/search"
        className="DesktopSearch flex h-full w-[33%] items-center justify-center"
      >
        <div
          onClick={openSearchPage}
          className="Search flex h-[80%] w-full cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white shadow-md shadow-black/40 transition-all ease-linear dark:bg-white/15"
        >
          <IoMdSearch className="size-[90%] transition-all duration-300 ease-linear hover:rotate-45" />
        </div>
      </NavLink>

      <ForecastTab />
    </nav>
  );
};

export default BottomNavbar;

const HomeTab = () => {
  return (
    <NavLink
      to={"/"}
      className={({ isActive }) =>
        ` ${isActive ? "text-blue-500" : "text-black/65 dark:text-white/80"}`
      }
    >
      <button
        className={`relative flex size-full cursor-pointer flex-col items-center justify-center pt-[10%] hover:text-blue-500`}
      >
        <TbHomeFilled className="size-[65%]" />
        <h2 className="pb-[12%] text-[.63rem]">Home</h2>
      </button>
    </NavLink>
  );
};

const ForecastTab = () => {
  return (
    <NavLink
      to={`/forecast/${0}`}
      className={({ isActive }) =>
        ` ${isActive ? "text-blue-500" : "text-black/65 dark:text-white/80"}`
      }
    >
      <button
        className={`relative flex size-full cursor-pointer flex-col items-center justify-center pt-[10%] hover:text-blue-500`}
      >
        <TiChartLine className="size-[50%]" />
        <h2 className="pb-[12%] text-[.62rem] leading-3">Forecast</h2>
      </button>
    </NavLink>
  );
};
