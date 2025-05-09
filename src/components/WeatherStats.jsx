import React, { useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { PiWindBold } from "react-icons/pi";
import { SiRainmeter } from "react-icons/si";
import { WiRainMix } from "react-icons/wi";
import { useApiData } from "../context/ApiContext";
import useLocalStorage from "../hooks/useLocalStorage";
import WeatherStatsSkeleton from "./skeletons/WeatherStatsSkeleton";

const WeatherStats = ({ index }) => {
  const { currentData, isLoading, getDailyData } = useApiData();
  const data = index !== undefined ? getDailyData(index) : currentData;

  const {
    uvIndex,
    uvHealthConcern,
    humidity,
    pressure,
    visibility,
    windSpeed,
    windDirection,
    rainIntensity,
    precipitationProbability,
  } = data;

  const availableStats = [
    { label: "UV index", value: uvIndex, unit: uvHealthConcern },
    {
      label: "Visibility",
      value: visibility,
      unit: "km",
      icon: <FaEye className="size-5 md:size-8" />,
    },
    {
      label: "WindDirection",
      icon: (
        <CiLocationArrow1
          className="size-8 md:size-11"
          style={{
            transform: `rotate(${windDirection}deg)`,
          }}
        />
      ),
    },
    {
      label: "Rain Intensity",
      value: rainIntensity,
      unit: "mm",
      icon: <WiRainMix size="1.7rem" />,
    },
    {
      label: "Wind Speed",
      value: windSpeed,
      unit: "km/h",
      icon: <PiWindBold className="size-6 md:size-9" />,
    },
    {
      label: "Chances of Rain",
      value: precipitationProbability,
      unit: "%",
      icon: <WiRainMix className="size-7 md:size-11" />,
    },
    {
      label: "Humidity",
      value: humidity,
      unit: "%",
      icon: <SiRainmeter className="size-6 md:size-8" />,
    },
    { label: "Pressure", value: pressure, unit: "hPa" },
  ];
  // State for user-selected stats
  const [userStats, setUserStats] = useLocalStorage("weatherStats", [
    "Humidity",
    "Wind Speed",
    "Chances of Rain",
  ]);
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Close tooltip on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".tooltip-trigger")) setActiveTooltip(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleStatChange = (index, newStatLabel) => {
    setUserStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[index] = newStatLabel;
      return updatedStats;
    });
    setActiveTooltip(null);
  };

  if (isLoading) return <WeatherStatsSkeleton />;

  return (
    <div className="flex w-full items-center justify-center gap-3.5 md:items-center">
      {userStats.map((statKey, index) => {
        const stats = availableStats.find((item) => item.label === statKey);
        return (
          <div
            key={index}
            className="tooltip-trigger hover-scale relative flex min-h-[67px] w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl bg-white/10 shadow-md shadow-black/20 dark:bg-white/5 dark:shadow-black/40 md:h-20 md:w-44"
            onClick={() =>
              setActiveTooltip(activeTooltip === index ? null : index)
            }
          >
            {/* Display Stat */}
            <span className="flex w-full items-center justify-center gap-1 font-[500] leading-3 md:text-3xl md:font-[600]">
              {stats.icon}
              <span className="text-lg md:text-xl">{stats.value}</span>
              <span className="text-sm md:text-base">{stats.unit}</span>
            </span>
            <h1 className="px-2 text-center text-xs font-[600] leading-3 md:text-sm md:font-[500]">
              {stats.label}
            </h1>

            {/* Tooltip */}
            <div
              className={`absolute bottom-[110%] z-10 h-40 w-32 overflow-auto rounded-xl bg-white p-2 pt-0 text-black shadow-lg transition-all duration-300 ease-in-out dark:bg-black dark:text-white md:h-52 md:w-40 ${activeTooltip === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
            >
              {/* Tooltip heading */}
              <div className="sticky top-0 mb-1 bg-inherit pt-2 text-sm font-semibold text-blue-600 dark:text-white">
                Replace with-
              </div>

              {/* Tooltip content */}
              {availableStats
                .filter((item) => !userStats.includes(item.label))
                .map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="cursor-pointer p-1 text-sm italic hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleStatChange(index, item.label)}
                  >
                    {item.label}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherStats;
