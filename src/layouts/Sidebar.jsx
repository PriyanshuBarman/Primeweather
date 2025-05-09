import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowDown, IoMdMoon, IoMdSearch } from "react-icons/io";
import { MdWidgets } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import Socials from "../components/Socials";
import { useSidebar } from "../context/SidebarContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const {
    toggleWidget,
    hiddenWidgets,
    isDailyForecastHidden,
    setisDailyForecastHidden,
  } = useSidebar();
  const { currentTheme, toggleTheme } = useTheme();
  const [isWidgetTabOpen, setIsWidgetTabOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const widgetList = [
    "uvIndex",
    "humidity",
    "clouds",
    "precipitation",
    "pressure",
    "windDirection",
    "sunriseSunset",
  ];

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);
  
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="toggle-btn fixed left-2 top-2 z-50 h-7 w-10 overflow-hidden rounded-md bg-white p-0.5 text-black shadow-md shadow-black/30 dark:bg-[#484848] dark:text-white"
      >
        <RxCross1
          className={`absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isSidebarOpen ? "visible opacity-100" : "invisible -translate-y-12 opacity-0"}`}
        />

        <HiOutlineMenuAlt2
          className={`absolute left-1/2 top-1/2 size-[75%] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isSidebarOpen ? "invisible translate-y-12 opacity-0" : "visible opacity-100"}`}
        />
      </button>

      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 left-0 z-40 h-screen w-full bg-black/80 text-base transition-opacity md:w-full ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Sidebar container */}
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`sidebar fixed left-0 top-0 z-50 h-full w-[80%] transform rounded-r-[4rem] border-white/50 bg-gray-100 text-black/80 transition-transform duration-300 ease-out dark:border-r md:w-[30%] md:pl-9 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } dark:bg-[#1a1a1a] dark:text-white`}
        >
          <ul className="relative ml-6 mt-16 h-full space-y-7 font-[500]">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex cursor-pointer items-center gap-3 rounded-r-full text-black ${
                    isActive
                      ? "text-blue-500"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  } `
                }
                onClick={toggleSidebar}
              >
                <TbHomeFilled className="mr-2 size-7 fill-black dark:fill-white" />{" "}
                Home
              </NavLink>
            </li>

            {/* Search  */}
            <li
              className={`flex cursor-pointer items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700`}
              onClick={() => {
                navigate("/search");
                toggleSidebar();
              }}
            >
              <IoMdSearch className="mr-2 size-8 fill-black dark:fill-white" />{" "}
              Search
            </li>

            {/* Forecast  */}
            <li>
              <NavLink
                to={`/forecast/${0}`}
                className={`flex cursor-pointer items-center gap-3 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-700`}
                onClick={toggleSidebar}
              >
                <TiChartLine className="mr-2 size-7 fill-black dark:fill-white" />{" "}
                Forecast
              </NavLink>
            </li>

            {/* Widgets */}
            <li className="cursor-pointer">
              <div
                onClick={() => setIsWidgetTabOpen(!isWidgetTabOpen)}
                className="flex items-center"
              >
                <MdWidgets className="fill-black text-2xl dark:fill-white" />
                <span className="ml-6 flex items-center">Hide Widgets</span>
                <IoIosArrowDown
                  className={`ml-2 size-5 transition-transform ${
                    isWidgetTabOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isWidgetTabOpen && (
                <ul className="ml-10 mt-2 space-y-1 text-sm italic">
                  {widgetList.map((widget) => (
                    <li key={widget}>
                      <label className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          value=""
                          className="peer sr-only"
                          checked={hiddenWidgets[widget]}
                          onChange={() => toggleWidget(widget)}
                        />
                        <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
                        <span className="capitalize"> {widget}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <span className="flex gap-2 text-sm font-[500] italic">
                  <IoMdMoon
                    className={`size-5 text-black transition-transform duration-[900ms] dark:text-white ${
                      currentTheme === "light" ? "rotate-0" : "rotate-[360deg]"
                    }`}
                  />
                  Dark Mode
                </span>

                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={currentTheme === "dark"}
                  onChange={() => toggleTheme()}
                />
                <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </li>
            <li className={`w-[90%]`}>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <span className="text-sm">Daily Forecast on HomeTab</span>

                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  checked={!isDailyForecastHidden}
                  onChange={() =>
                    setisDailyForecastHidden(!isDailyForecastHidden)
                  }
                />
                <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </li>
            <li className={`absolute bottom-28 w-full`}>
              <Socials />
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
