import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowDown, IoMdMoon, IoMdSearch } from "react-icons/io";
import { MdCloseFullscreen, MdWidgets } from "react-icons/md";
import { TbHomeFilled } from "react-icons/tb";
import { TiChartLine } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";

const DeskTopSidebar = () => {
  const { toggleWidget, hiddenWidgets } = useSidebar();
  const { currentTheme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWidgetTabOpen, setIsWidgetTabOpen] = useState(false);
  const [showWidgetPopup, setShowWidgetPopup] = useState(false);

  const widgetList = [
    "uvIndex",
    "humidity",
    "clouds",
    "precipitation",
    "pressure",
    "windDirection",
    "sunriseSunset",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    setIsWidgetTabOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full pt-16 shadow-sm shadow-black/30 transition-all duration-200 ${
          isSidebarOpen ? "w-80" : "w-16"
        } bg-white text-black dark:bg-[#272626] dark:text-white`}
      >
        <div
          className="logo hover-scale absolute top-1 ml-3 flex items-center gap-3"
          onClick={toggleSidebar}
        >
          <img src="/Logo.png" alt="" className="size-9 rounded-full" />
          <span
            className={`absolute left-14 top-2 w-40 text-xl font-[500] italic transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-24 scale-0 opacity-0 duration-100"}`}
          >
            Prime Weather
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className={`group relative ml-2 h-7 w-12 rounded-md bg-slate-100 p-1 text-black shadow-md hover:scale-110 dark:bg-[#484848] dark:text-white ${!isSidebarOpen ? "translate-x-0 duration-100" : "translate-x-56 duration-200"}`}
        >
          {isSidebarOpen ? (
            <MdCloseFullscreen className="size-full" />
          ) : (
            <HiOutlineMenuAlt2 className="size-full" />
          )}
        </button>

        <ul className="mt-5 space-y-4 font-[500]">
          {/* Home */}
          <li className="group relative flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex min-w-full items-center justify-start py-2 pl-4 hover:bg-gray-200 dark:hover:bg-white/10 ${
                  isActive && "border-r-2 border-blue-500 text-blue-500"
                }`
              }
            >
              <TbHomeFilled size={27} />
              <span
                className={`absolute left-16 transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-20 scale-0 opacity-0 duration-200"}`}
              >
                Home
              </span>
            </NavLink>
            {!isSidebarOpen && (
              <span className="absolute left-20 top-0 -translate-x-14 scale-0 whitespace-nowrap rounded-md bg-white px-3.5 py-1.5 font-[600] italic text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                Home
              </span>
            )}
          </li>

          {/* Search */}
          <li className="group relative flex">
            <div className="flex min-w-full cursor-pointer items-center justify-start py-2 pl-4 hover:bg-gray-200 dark:hover:bg-white/10">
              <IoMdSearch size={30} />
              <span
                className={`absolute left-16 transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-20 scale-0 opacity-0 duration-100"}`}
              >
                Search
              </span>
            </div>
            {!isSidebarOpen && (
              <span className="absolute left-20 top-0 -translate-x-14 scale-0 whitespace-nowrap rounded-md bg-white px-3.5 py-1.5 font-[600] italic text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                Search
              </span>
            )}
          </li>

          {/* Forecast */}
          <li className="group relative flex">
            <NavLink
              to="/forecast/0"
              className={({ isActive }) =>
                `flex min-w-full items-center justify-start py-2 pl-4 hover:bg-gray-200 dark:hover:bg-white/10 ${
                  isActive && "border-r-2 border-blue-500 text-blue-500"
                }`
              }
            >
              <TiChartLine size={27} />
              <span
                className={`absolute left-16 transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-20 scale-0 opacity-0 duration-100"}`}
              >
                Forecast
              </span>
            </NavLink>
            {!isSidebarOpen && (
              <span className="absolute left-20 top-0 -translate-x-14 scale-0 whitespace-nowrap rounded-md bg-white px-3.5 py-1.5 font-[600] italic text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                Forecast
              </span>
            )}
          </li>

          {/* Widgets */}
          <li className="group relative">
            <div
              className="flex min-w-full cursor-pointer items-center justify-start py-2 pl-4 hover:bg-gray-200 dark:hover:bg-white/10"
              onClick={() => setIsWidgetTabOpen((prev) => !prev)}
            >
              <MdWidgets
                size={27}
                onClick={() => setShowWidgetPopup((prev) => !prev)}
              />
              <span
                className={`absolute left-16 flex w-32 items-center justify-between transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-20 scale-0 opacity-0 duration-100"}`}
              >
                Hide Widgets
                <IoIosArrowDown
                  className={`transform transition-transform ${
                    isWidgetTabOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>
            {!isSidebarOpen && (
              <span className="absolute left-20 top-0 -translate-x-14 scale-0 whitespace-nowrap rounded-md bg-white px-3.5 py-1.5 font-[600] italic text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                Hide Widgets
              </span>
            )}
            <div
              className={`absolute left-20 top-0 -translate-y-10 whitespace-nowrap rounded-lg bg-white px-5 py-4 text-sm font-[500] italic text-black transition-all duration-300 dark:bg-white/10 dark:backdrop-blur-2xl ${!isSidebarOpen && showWidgetPopup ? "-translate-x-0 scale-100 opacity-100" : "-translate-x-14 scale-0 opacity-0"}`}
            >
              <ul className="space-y-2">
                {widgetList.map((widget) => (
                  <li
                    key={widget}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-base capitalize text-gray-800 dark:text-gray-200">
                      {widget}
                    </span>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={hiddenWidgets[widget]}
                        onChange={() => toggleWidget(widget)}
                      />
                      <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[3px] after:h-2.5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {isWidgetTabOpen && isSidebarOpen && (
              <div className="mt-2 space-y-2 pl-12 pr-10">
                {widgetList.map((widget) => (
                  <div
                    key={widget}
                    className="flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-600"
                  >
                    <span className="text-sm capitalize text-gray-800 dark:text-gray-200">
                      {widget}
                    </span>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={hiddenWidgets[widget]}
                        onChange={() => toggleWidget(widget)}
                      />
                      <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[1.75px] after:h-3 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] hover:bg-blue-400 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* Dark Mode */}
          <li className="group relative flex">
            <div className="flex min-w-full cursor-pointer items-center justify-start py-2 pl-5 hover:bg-gray-200 dark:hover:bg-white/10">
              <IoMdMoon
                onClick={toggleTheme}
                className={`text-2xl text-black transition-transform duration-700 dark:text-white ${
                  currentTheme === "light" ? "rotate-0" : "rotate-[360deg]"
                }`}
              />
              <span
                className={`absolute left-16 flex w-44 items-center gap-4 transition-all ease-out ${isSidebarOpen ? "-translate-x-0 scale-100 opacity-100 duration-300" : "-translate-x-20 scale-0 opacity-0 duration-100"}`}
              >
                Dark Mode
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={currentTheme === "dark"}
                    onChange={toggleTheme}
                  />
                  <div className="peer relative min-h-4 min-w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-[2.1px] after:h-3 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] hover:bg-blue-400 peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:bg-white/40 dark:peer-focus:ring-blue-600 rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </span>
            </div>
            {!isSidebarOpen && (
              <span className="absolute left-20 top-0 -translate-x-14 scale-0 whitespace-nowrap rounded-md bg-white px-3.5 py-1.5 font-[600] italic text-black opacity-0 transition-all duration-300 group-hover:-translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                Dark Mode
              </span>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default DeskTopSidebar;
