import React, { useEffect, useRef, useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { PiSunFill } from "react-icons/pi";
import { useApiData } from "../Context/ApiContext";
import { useSidebar } from "../Context/SidebarContext";
import SunriseSunsetSkeleton from "./Skeletons/SunriseSunsetSkeleton";

const SunriseSunset = () => {
  const { currentData, isLoading } = useApiData();
  const { hiddenWidgets } = useSidebar();
  const { toggleWidget } = useSidebar();

  const [showTooltip, setShowTooltip] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const widgetRef = useRef(null);

  const { sunRise, sunSet, time, isDayTime } = currentData;
  let currentTime = time;

  const handleClick = () => {
    setShowTooltip((prev) => !prev);
    setIsClicked(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setShowTooltip(false);
        setIsClicked(false);
      }
    };

    if (isClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  const getTimeInMinutes = (time) => {
    if (!time) return;
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const currentTimeInMinutes = getTimeInMinutes(currentTime) || 0;
  const sunriseMinutes = getTimeInMinutes(sunRise) || 0;
  const sunsetMinutes = getTimeInMinutes(sunSet) || 0;

  const calculateSunPositionAngle = () => {
    const totalDaylightMinutes = sunsetMinutes - sunriseMinutes;
    const timeSinceSunrise = currentTimeInMinutes - sunriseMinutes;
    // The Sun will rise from Right and Sunset to the Left
    // return (timeSinceSunrise / totalDaylightMinutes) * 180;

    // The Sun will rise from Left and Sunset to the Right
    return 180 - (timeSinceSunrise / totalDaylightMinutes) * 180;
  };

  const sunPositionAngle = calculateSunPositionAngle();

  const calculateSunPositionOnArc = (angle) => {
    const radius = 40; // Adjust this to control distance from the center
    const centerX = 50;
    const centerY = 50;
    const radians = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY - radius * Math.sin(radians),
    };
  };

  const { x: sunXPosition, y: sunYPosition } =
    calculateSunPositionOnArc(sunPositionAngle);

  // const totalMinutes = sunsetMinutes - sunriseMinutes;
  // const dayLight = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;

  if (hiddenWidgets.sunriseSunset) return;

  if (isLoading) return <SunriseSunsetSkeleton />;
  return (
    <div
      ref={widgetRef}
      onClick={handleClick}
      className="hover-scale-2 relative mt-7 w-[95%] cursor-pointer flex-col items-center rounded-2xl border-r border-t border-black/10 bg-white/25 pb-1 text-xs shadow-md shadow-black/30 dark:border-white/5 dark:bg-[#171717] dark:shadow-black md:mt-3 md:w-[92%] md:bg-white md:dark:mt-4 md:dark:w-[97%] md:dark:bg-[#1c1c1c]"
    >
      {/* <h1 className="absolute bottom-0 flex w-full -skew-x-12 justify-end whitespace-pre rounded-br-3xl py-[.06rem] pl-3 pr-4 text-[.66rem] font-[500]">
        Daylight: {dayLight}
        </h1> */}
      <div className="relative flex h-[160px] w-full items-center justify-center overflow-hidden md:h-[180px]">
        <h1 className="absolute left-0 top-0 -skew-x-12 rounded-br-3xl rounded-tl-xl bg-black/5 py-[.09rem] pl-5 pr-5 text-[.75rem] font-[500] shadow-sm shadow-black/30 dark:bg-white/10 dark:shadow-black md:pl-7 md:pr-10 md:text-sm">
          Sun Position
        </h1>
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50" // Left to right path (sunrise to sunset)
            stroke="rgb(226,135,67)"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          <path
            d="M 90 50 A 40 40 0 0 1 10 50" // Right to left path (sunset to sunrise)
            stroke="gray"
            className="fill-transparent"
            strokeWidth="1.2"
          />
          {/* Sun position */}
          <g
            className="absolute"
            style={{
              transform: `translate(${sunXPosition}%, ${sunYPosition}%)`,
            }}
          >
            <circle
              r="3.7"
              className={`${isDayTime ? "fill-orange-600" : "fill-gray-700 dark:fill-gray-100"} animate-ping`}
              opacity="0.75"
            />
          </g>
          <circle
            cx={sunXPosition || 50}
            cy={sunYPosition || 50}
            r="2.6"
            className={`${isDayTime ? "fill-red-400" : "fill-gray-500 dark:fill-gray-300"}`}
          />
        </svg>

        <div className="absolute flex h-[.077rem] w-full items-center justify-center bg-black/50 dark:bg-white/50">
          <div className="absolute w-[21%] rounded-full border-b-[1.5px] border-t-[1.5px] border-black/40 bg-[#f9f9f9] text-center text-[75%] font-[500] italic leading-3 dark:border-white/25 dark:bg-[#1f1f1f] md:text-xs">
            Horizon
          </div>

          {/* Sunrise Sunset */}
          <div className="absolute right-0 flex h-5 w-full items-center justify-center">
            <h1 className="absolute left-7 flex flex-col gap-2 text-[.88rem] font-[600] italic md:gap-1 md:text-base">
              Sunrise
              <span className="text-[.9rem] font-[500] md:text-lg">
                {sunRise}
              </span>
            </h1>
            <h1 className="absolute right-7 flex flex-col gap-2 text-[.88rem] font-[600] italic md:gap-1 md:text-base">
              Sunset
              <span className="text-[.9rem] font-[500] md:text-lg">
                {sunSet}
              </span>
            </h1>
          </div>
          {/* Day Night */}
          <div className="absolute bottom-1 flex size-14 flex-col items-center justify-center gap-0.5 md:bottom-3 md:gap-1">
            <PiSunFill className="size-6 text-orange-400 md:size-[50%]" />
            <h2 className="text-[1em] font-[500] italic md:text-sm">Day</h2>
          </div>
          <div className="absolute top-2 flex size-14 flex-col items-center justify-center gap-1.5 md:top-3 md:gap-2">
            <BsFillMoonStarsFill className="size-4 text-gray-600 dark:text-gray-400 md:size-[30%]" />
            <h2 className="text-[1em] font-[500] italic md:text-sm">Night</h2>
          </div>
        </div>
      </div>
      <div
        onClick={() => toggleWidget("sunriseSunset")}
        className={`absolute -top-1 right-16 mb-4 md:transition-all duration-200  hover:scale-110 ${
          showTooltip
            ? "-translate-y-10 scale-100 opacity-100"
            : "-translate-y-0 scale-0 opacity-0"
        }`}
      >
        <div className="relative">
          <div className="flex items-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-r from-blue-300 to-blue-500 px-3 py-1.5 text-sm font-[500] text-white shadow backdrop-blur-sm dark:from-white dark:to-white dark:text-black md:dark:font-semibold">
            <BiSolidHide size={20} />
            Hide
          </div>
          <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 border-l-[4px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-blue-400 dark:border-t-white"></div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
